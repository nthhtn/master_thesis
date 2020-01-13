import { ObjectID } from 'mongodb';

export default class UserModel {

	constructor(db) {
		this._db = db;
		this._table = 'conversation';
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
			const result = await this._db.collection(this._table).find(fields).toArray();
			return await result;
		} catch (error) {
			return Promise.reject(error.message);
		}
	}

}
