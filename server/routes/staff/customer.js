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

	router.route('/search')
		.get(async (req, res) => {
			try {
				const regex = new RegExp(req.query.q, 'gi');
				const result = await Customer.queryByFields({ $or: [{ email: { $regex: regex } }, { fullName: { $regex: regex } }] });
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	router.route('/:id')
		.get(async (req, res) => {
			try {
				const result = await Customer.read(req.params.id);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.put(async (req, res) => {
			try {
				const result = await Customer.update(req.params.id, req.body);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.delete(async (req, res) => {
			try {
				const result = await Customer.delete(req.params.id);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	app.use('/api/customers', router);

};
