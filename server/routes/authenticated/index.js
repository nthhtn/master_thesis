import express from 'express';

import UserModel from '../../models/user';
import CustomerModel from '../../models/customer';

module.exports = (app, db) => {

	const router = express.Router();
	const User = new UserModel(db);
	const Customer = new CustomerModel(db);

	router.route('/me')
		.get(async (req, res) => {
			try {
				const { _id, firstName, lastName, email, phone, address, role, customerId } = req.user;
				const result = { _id, firstName, lastName, email, phone, address, role, customerId };
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.put(async (req, res) => {

		});

	app.use('/api', router);

};
