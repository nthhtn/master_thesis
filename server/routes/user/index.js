import express from 'express';

module.exports = (app, db) => {

	const router = express.Router();

	router.route('/me')
		.get(async (req, res) => {
			try {
				const { _id, firstName, lastName, email, phone, address, role, customerId } = req.user;
				const result = { _id, firstName, lastName, email, phone, address, role, customerId };
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	app.use('/api', router);

};
