import UserModel from '../models/user';
import WorkgroupModel from '../models/workgroup';
import ConversationModel from '../models/conversation';
import TaskModel from '../models/task';
import { generateSalt, hashPassword } from './password';
import Promise from 'bluebird';

module.exports = async (db) => {
	const User = new UserModel(db);
	await Promise.map([1, 2, 3, 4], (item) => {
		let test_user = {
			email: `test${item}@gmail.com`,
			salt: generateSalt(),
			firstName: 'Test',
			lastName: 'User',
			phone: '',
			address: '',
			userType: 'manager'
		};
		test_user.password = hashPassword('123456', test_user.salt);
		return User.create(test_user);
	});
	console.log('Test users created');
	const Workgroup = new WorkgroupModel(db);
	// const Conversation = new ConversationModel(db);
	// const Task = new TaskModel(db);
	// const test_workgroups = [1, 2, 3, 4, 5, 6].map((item) => ({ _id: item, name: `Workgroup ${item}`, description: `Just a test item ${item}` }));
	// await Promise.map(test_workgroups, (item) => Workgroup.create(item));
	// console.log('Test workgroups created');
};
