import express from 'express';

import TicketModel from '../../models/ticket';
import TicketCommentModel from '../../models/ticketComment';

module.exports = (app, db) => {

	const router = express.Router();
	const Ticket = new TicketModel(db);
	const TicketComment = new TicketCommentModel(db);

	router.route('/')
		.get(async (req, res) => {
			try {
				const result = await Ticket.lookupByFields(req.query);
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

	router.route('/:id')
		.get(async (req, res) => {
			try {
				const result = await Ticket.read(req.params.id);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	router.route('/:id/comments')
		.post(async (req, res) => {
			try {
				const data = { ...req.body, ticketId: req.params.id, commenterId: req.session.user._id };
				const result = await TicketComment.create(data);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.get(async (req, res) => {
			try {
				const result = await TicketComment.lookupByFields({ ticketId: req.params.id });
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	app.use('/api/tickets', router);

};
