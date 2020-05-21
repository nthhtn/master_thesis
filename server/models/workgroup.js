import { ObjectID } from 'mongodb';

// let workgroup = {
// 	_id: 'string',
// 	name: 'string',
// 	description: 'string',
// 	creatorId: 'string',
// 	lastActivityAt: 'number'
// };

export default class WorkgroupModel {

	constructor(db) {
		this._db = db;
		this._table = 'workgroup';
	}

	async create(data) {
		data._id = new ObjectID().toString();
		const datetime = Date.now();
		data.createdAt = datetime;
		data.updatedAt = datetime;
		data.lastActivityAt = datetime;
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
			const result = await this._db.collection(this._table).find(fields).toArray();
			return await result;
		} catch (error) {
			return Promise.reject(error.message);
		}
	}

}
