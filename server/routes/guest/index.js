import express from 'express';
import path from 'path';
import UserModel from '../../models/user';

module.exports = (app, db) => {

	let router = express.Router();
	const User = new UserModel(app, db);

	router.route('/login')
		.get(async (req, res) => {
			return res.sendFile(path.resolve(`${__dirname}/../../views/guest.html`));
		})
		.post(async (req, res) => {
			let { email, password } = req.body;
			try {
			} catch (error) {

			}
		})

	app.use('/', router);

};
