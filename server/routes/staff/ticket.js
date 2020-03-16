import express from 'express';

import TicketModel from '../../models/ticket';

module.exports = (app, db) => {

	const router = express.Router();
	const Ticket = new TicketModel(db);

	router.route('/')
		.get(async (req, res) => {
			try {
				const result = await Ticket.queryByFields(req.query);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.post(async (req, res) => {
			try {
				const result = await Ticket.create(req.body);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	app.use('/api/tickets', router);

};
