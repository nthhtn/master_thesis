import express from 'express';

import IssueModel from '../../models/issue';

module.exports = (app, db) => {

	const router = express.Router();
	const Issue = new IssueModel(db);

	router.route('/')
		.get(async (req, res) => {
			try {
				const result = await Issue.queryByFields(req.query);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.post(async (req, res) => {
			try {
				const result = await Issue.create(req.body);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	router.route('/:id')
		.get(async (req, res) => {
			try {
				const result = await Issue.read(req.params.id);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.put(async (req, res) => {
			try {
				const result = await Issue.update(req.params.id, req.body);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	app.use('/api/issues', router);

};
