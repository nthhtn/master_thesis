import express from 'express';

import ConversationModel from '../../models/conversation';

module.exports = (app, db) => {

	const router = express.Router();
	const Conversation = new ConversationModel(db);

	router.route('/')
		.get(async (req, res) => {
			try {
				const result = await Conversation.lookupByFields(req.query);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.post(async (req, res) => {
			try {
				const result = await Conversation.create({ ...req.body, creatorId: req.session.user._id });
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	router.route('/:id')
		.get(async (req, res) => {
			try {
				const result = await Conversation.read(req.params.id);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	app.use('/api/conversations', router);

};
