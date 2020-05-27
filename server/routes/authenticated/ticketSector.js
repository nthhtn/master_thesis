import express from 'express';

import TicketSectorModel from '../../models/ticketSector';

module.exports = (app, db) => {

	const router = express.Router();
	const TicketSector = new TicketSectorModel(db);

	router.route('/')
		.get(async (req, res) => {
			try {
				const result = await TicketSector.queryByFields(req.query);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.post(async (req, res) => {
			try {
				const result = await TicketSector.create(req.body);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	router.route('/:id')
		.get(async (req, res) => {
			try {
				const result = await TicketSector.read(req.params.id);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.put(async (req, res) => {
			try {
				const result = await TicketSector.update(req.params.id, req.body);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	app.use('/api/ticketsectors', router);

};
