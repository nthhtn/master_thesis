import express from 'express';

module.exports = (app, db) => {

	const router = express.Router();

	router.route('/me')
		.get(async (req, res) => {
			try {
				const { firstName, lastName, email, phone, address, userType } = req.session.user;
				const result = { firstName, lastName, email, phone, address, userType };
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	app.use('/api', router);

};
