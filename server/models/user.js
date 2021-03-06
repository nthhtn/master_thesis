import { ObjectID } from 'mongodb';

// let user = {
// 	_id: 'string',
// 	email: 'string',
// 	salt: 'string',
// 	password: 'string',
// 	firstName: 'string',
// 	lastName: 'string',
// 	phone: 'string',
// 	address: 'string',
// 	role: 'string',
// 	customerId: 'string'
// };

export default class UserModel {

	constructor(db) {
		this._db = db;
		this._table = 'user';
	}

	async create(data) {
		data._id = new ObjectID().toString();
		const datetime = Date.now();
		data.createdAt = datetime;
		data.updatedAt = datetime;
		try {
			await this._db.collection(this._table).insertOne(data);
			return Promise.resolve(data);
		} catch (error) {
			return Promise.reject(error.message);
		}
	}

	async read(id) {
		try {
			return await this._db.collection(this._table).findOne({ _id: id });
		} catch (error) {
			return Promise.reject(error.message);
		}
	}

	async update(id, data) {
		try {
			data.updatedAt = Date.now();
			const result = await this._db.collection(this._table).findOneAndUpdate({ _id: id }, { $set: data }, { returnOriginal: false });
			return Promise.resolve(result.value);
		} catch (error) {
			return Promise.reject(error.message);
		}
	}

	async delete(id) {
		try {
			const result = await this._db.collection(this._table).findOneAndDelete({ _id: id });
			return Promise.resolve(result.value);
		} catch (error) {
			return Promise.reject(error.message);
		}
	}

	async queryByFields(fields = {}) {
		try {
			const result = await this._db.collection(this._table).find(fields, { projection: { password: 0 } }).toArray();
			return await result;
		} catch (error) {
			return Promise.reject(error.message);
		}
	}

	async readByEmail(email) {
		try {
			return await this._db.collection(this._table).findOne({ email });
		} catch (error) {
			return Promise.reject(error.message);
		}
	}

}
