import express from 'express';

import ConversationCommentModel from '../../models/conversationComment';

module.exports = (app, db) => {

	const router = express.Router();
	const ConversationComment = new ConversationCommentModel(db);

	router.route('/')
		.get(async (req, res) => {
			try {
				const result = await ConversationComment.lookupByFields(req.query);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.post(async (req, res) => {
			try {
				const result = await ConversationComment.create({ ...req.body, creatorId: req.session.user._id });
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	app.use('/api/conversation_comments', router);

};
