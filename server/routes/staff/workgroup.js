import express from 'express';

import WorkgroupModel from '../../models/workgroup';

module.exports = (app, db) => {

	const router = express.Router();
	const Workgroup = new WorkgroupModel(db);

	router.route('/')
		.get(async (req, res) => {
			try {
				const result = await Workgroup.queryByFields(req.query);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message })
			}
		})
		.post(async (req, res) => {
			try {
				const result = await Workgroup.create(req.body);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message })
			}
		});

	app.use('/api/workgroups', router);

};
