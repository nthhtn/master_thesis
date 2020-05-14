import express from 'express';

import TaskModel from '../../models/task';

module.exports = (app, db) => {

	const router = express.Router();
	const Task = new TaskModel(db);

	router.route('/')
		.get(async (req, res) => {
			try {
				const result = await Task.lookupByFields(req.query);
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

	router.route('/search')
		.get(async (req, res) => {
			try {
				const regex = new RegExp(req.query.q, 'gi');
				const result = await Task.queryByFields({ name: { $regex: regex } });
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	router.route('/:id')
		.get(async (req, res) => {
			try {
				const result = await Task.read(req.params.id);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.put(async (req, res) => {
			try {
				const result = await Task.update(req.params.id, req.body);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.delete(async (req, res) => {
			try {
				const result = await Task.delete(req.params.id);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	app.use('/api/tasks', router);

};
