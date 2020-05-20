import express from 'express';
import path from 'path';
import { hashPassword, generateSalt } from '../../helpers/password';
import passport from 'passport';
import { Strategy } from 'passport-local';
import UserModel from '../../models/user';
import CustomerModel from '../../models/customer';

module.exports = (app, db) => {

	let router = express.Router();
	const User = new UserModel(db);
	const Customer = new CustomerModel(db);

	passport.use(new Strategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, async (req, email, password, done) => {
		if (req.role === 'user') {
			const user = await User.readByEmail(email);
			if (!user || user.password !== hashPassword(password, user.salt)) {
				return done(null, false, { success: false, error: 'Invalid username/password' });
			}
			return done(null, user);
		}
		const user = await User.readByEmail(email);
		let guest = null;
		if (!user) {
			const fullName = email.split('@')[0];
			const customer = await Customer.create({ fullName, email });
			let data = {
				firstName: 'Guest',
				lastName: fullName,
				email,
				salt: generateSalt(),
				phone: '',
				address: '',
				role: 'guest',
				customerId: customer._id
			};
			data.password = hashPassword(password, data.salt);
			guest = await User.create(data);
		} else if (user.password !== hashPassword(password, user.salt)) {
			return done(null, false, { success: false, error: 'Invalid username/password' });
		}
		return done(null, user || guest);
	}));

	router.route('/login')
		.get(async (req, res) => {
			return res.sendFile(path.resolve(`${__dirname}/../../views/anonymous.html`));
		})
		.post((req, res) => {
			passport.authenticate('local', (err, user, info) => {
				if (err) { return res.status(500).json({ success: false, error: err.message }); }
				if (!user) { return res.status(401).json(info); }
				req.login(user, (err) => {
					if (err) { return res.status(500).json({ success: false, error: err.message }); }
					return res.json({ success: true });
				});
			})(req, res);
		});

	app.use('/', router);

};
