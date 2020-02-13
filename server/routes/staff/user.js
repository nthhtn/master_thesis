import express from 'express';

import UserModel from '../../models/user';

module.exports = (app, db) => {

	const router = express.Router();
	const User = new UserModel(db);

	router.route('/')
		.get(async (req, res) => {
			try {
				const result = await User.queryByFields(req.query);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.post(async (req, res) => {
			try {
				const result = await User.create(req.body);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	router.route('/:id')
		.get(async (req, res) => {
			try {
				const data = await User.read(req.params.id);
				console.log(data);
				const { _id, firstName, lastName, email } = data;
				return res.json({ success: true, result: { _id, firstName, lastName, email } });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	app.use('/api/users', router);

};
