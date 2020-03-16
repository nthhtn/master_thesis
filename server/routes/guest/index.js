import express from 'express';
import path from 'path';
import UserModel from '../../models/user';
import { hashPassword } from '../../helpers/password';
import passport from 'passport';
import { Strategy } from 'passport-local';

module.exports = (app, db) => {

	let router = express.Router();
	const User = new UserModel(db);

	passport.use(new Strategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
		const user = await User.readByEmail(email);
		if (!user || user.password !== hashPassword(password, user.salt)) {
			return done(null, false, { success: false, error: 'Invalid username/password' });
		}
		return done(null, user);
	}));

	router.route('/login')
		.get(async (req, res) => {
			return res.sendFile(path.resolve(`${__dirname}/../../views/guest.html`));
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
