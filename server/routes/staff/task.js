import express from 'express';

import TaskModel from '../../models/task';

module.exports = (app, db) => {

	const router = express.Router();
	const Task = new TaskModel(db);

	router.route('/')
		.get(async (req, res) => {
			try {
				const result = await Task.queryByFields(req.query);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.post(async (req, res) => {
			try {
				const result = await Task.create(req.body);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	app.use('/api/tasks', router);

};
