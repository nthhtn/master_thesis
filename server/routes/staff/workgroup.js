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
				const result = await Workgroup.create(req.body);
				await WorkgroupMember.create({ workgroupId: result._id, userId: req.session.user._id });
				return res.json({ success: true, result });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	router.route('/:id')
		.get(async (req, res) => {
			try {
				const result = await Workgroup.read(req.params.id);
				const group = await WorkgroupMember.lookupMembersByWorkgroup({ workgroupId: req.params.id });
				return res.json({ success: true, result: { ...result, members: group.members } });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	router.route('/:id/members')
		.post(async (req, res) => {
			try {
				const list = await User.queryByFields({ email: { $in: req.body.list } });
				const data = list.map((item) => ({ workgroupId: req.params.id, userId: item }));
				const result = await WorkgroupMember.createMany(data);
				const members = await WorkgroupMember.lookupMembersByWorkgroup({ _id: { $in: result.map((item) => (item._id)) } });
				return res.json({ success: true, result: members });
			} catch (error) {
				return res.status(400).json({ success: false, error: error.message });
			}
		});

	app.use('/api/workgroups', router);

};
