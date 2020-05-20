import UserModel from '../models/user';
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
			role: 'manager'
		};
		test_user.password = hashPassword('123456', test_user.salt);
		return User.create(test_user);
	});
};
