import express from 'express';
import path from 'path';
import UserModel from '../../models/user';
import { hashPassword } from '../../helpers/password';

module.exports = (app, db) => {

	let router = express.Router();
	const User = new UserModel(db);

	router.route('/login')
		.get(async (req, res) => {
			return res.sendFile(path.resolve(`${__dirname}/../../views/guest.html`));
		})
		.post(async (req, res) => {
			let { email, password } = req.body;
			try {
				const user = await User.readByEmail(email);
				if (!user || user.password !== hashPassword(password, user.salt)) {
					return res.status(401).json({ success: false, error: 'Invalid username/password' });
				}
				req.session.user = user;
				const result = { email, firstName: user.firstName, lastName: user.lastName, fullName: user.fullName, userType: user.userType };
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	app.use('/', router);

};
