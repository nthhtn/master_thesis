import express from 'express';

import CustomerModel from '../../models/customer';

module.exports = (app, db) => {

	const router = express.Router();
	const Customer = new CustomerModel(db);

	router.route('/')
		.get(async (req, res) => {
			try {
				const result = await Customer.queryByFields(req.query);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.post(async (req, res) => {
			try {
				const result = await Customer.create(req.body);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	app.use('/api/customers', router);

};
