import express from 'express';

import WorkgroupModel from '../../models/workgroup';
import WorkgroupMemberModel from '../../models/workgroupMember';
import UserModel from '../../models/user';

module.exports = (app, db) => {

	const router = express.Router();
	const Workgroup = new WorkgroupModel(db);
	const WorkgroupMember = new WorkgroupMemberModel(db);
	const User = new UserModel(db);

	router.route('/')
		.get(async (req, res) => {
			try {
				const result = await Workgroup.queryByFields(req.query);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.post(async (req, res) => {
			try {
				const { name, description, members } = req.body;
				const result = await Workgroup.create({ name, description });
				await WorkgroupMember.createMany(members.map((member) => ({ workgroupId: result._id, userId: member })));
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	router.route('/search')
		.get(async (req, res) => {
			try {
				const result = await Workgroup.queryByFields({ name: { $regex: new RegExp(req.query.q, 'gi') } });
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	router.route('/:id')
		.get(async (req, res) => {
			try {
				const result = await Workgroup.read(req.params.id);
				const members = await WorkgroupMember.lookupMembersByWorkgroup(req.params.id);
				return res.json({ success: true, result: { ...result, members } });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.put(async (req, res) => {
			try {
				const result = await Workgroup.update(req.params.id, req.body);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	router.route('/:id/members')
		.post(async (req, res) => {
			const data = req.body.list.map((item) => ({ workgroupId: req.params.id, userId: item }));
			try {
				const result = await WorkgroupMember.createMany(data);
				return res.json({ success: true });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.get(async (req, res) => {
			try {
				const result = await WorkgroupMember.lookupMembersByWorkgroup(req.params.id);
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		})
		.delete(async (req, res) => {
			const fields = { userId: { $in: req.body.list }, workgroupId: req.params.id };
			try {
				const result = await WorkgroupMember.deleteMany(fields);
				return res.json({ success: true });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	app.use('/api/workgroups', router);

};
