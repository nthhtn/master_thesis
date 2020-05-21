import express from 'express';

import ConversationModel from '../../models/conversation';
import ConversationCommentModel from '../../models/conversationComment';
import WorkgroupModel from '../../models/workgroup';

module.exports = (app, db) => {

	const router = express.Router();
	const Conversation = new ConversationModel(db);
	const ConversationComment = new ConversationCommentModel(db);
	const Workgroup = new WorkgroupModel(db);

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
				const result = await Conversation.create({ ...req.body, creatorId: req.user._id });
				await Workgroup.update(result.workgroupId, { lastActivityAt: Date.now() });
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

	router.route('/:id/comments')
		.post(async (req, res) => {
			try {
				const data = { ...req.body, conversationId: req.params.id, commenterId: req.user._id };
				const result = await ConversationComment.create(data);
				await Conversation.update(req.params.id, { lastActivityAt: Date.now() });
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.get(async (req, res) => {
			try {
				const result = await ConversationComment.lookupByFields({ conversationId: req.params.id });
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	app.use('/api/conversations', router);

};
