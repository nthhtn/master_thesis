import express from 'express';
import fs from 'fs';

import TicketModel from '../../models/ticket';
import TicketCommentModel from '../../models/ticketComment';
import { sendMail } from '../../helpers/mailer';
import { host } from '../../../config/host';

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
		})
		.put(async (req, res) => {
			try {
				const result = await Ticket.update(req.params.id, req.body);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	router.route('/:id/comments')
		.post(async (req, res) => {
			try {
				const data = { ...req.body, ticketId: req.params.id, commenterId: req.user._id };
				const result = await TicketComment.create(data);
				const ticket = await Ticket.update(req.params.id, { lastActivityAt: Date.now() });
				res.json({ success: true, result });
				const templateData = {
					createdAt: new Date(result.createdAt),
					commenter: req.user.role === 'guest' ? req.user.lastName : req.user.firstName + ' ' + req.user.lastName,
					text: result.text,
					link: host + '/tickets/' + result.ticketId
				};
				const path = `${__dirname}/../../views/ticket_reply.html`;
				let html = fs.readFileSync(path, 'utf8');
				Object.keys(templateData).map((key) => html = html.replace('{{' + key + '}}', templateData[key]));
				sendMail({ to: 'thehien115@gmail.com', subject: `Re: Ticket "${ticket.title}"`, body: html });
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
