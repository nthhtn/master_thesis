import express from 'express';

import ConversationModel from '../../models/conversation';

module.exports = (app, db) => {

	const router = express.Router();
	const Conversation = new ConversationModel(db);

	router.route('/')
		.get(async (req, res) => {
			try {
				const result = await Conversation.queryByFields(req.query);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message })
			}
		})
		.post(async (req, res) => {
			try {
				const result = await Conversation.create(req.body);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message })
			}
		});

	app.use('/api/conversations', router);

};
