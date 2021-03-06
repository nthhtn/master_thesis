import { ObjectID } from 'mongodb';

// let conversationComment = {
// 	_id: 'string',
// 	text: 'string',
// 	conversationId: 'string',
// 	commenterId: 'string'
// };

export default class ConversationCommentModel {

	constructor(db) {
		this._db = db;
		this._table = 'conversationComment';
	}

	async create(data) {
		data._id = new ObjectID().toString();
		const datetime = Date.now();
		data.createdAt = datetime;
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

	async lookupByFields(fields = {}) {
		const lookup = {
			from: 'user',
			let: { commenterId: '$commenterId' },
			pipeline: [
				{ $match: { $expr: { $eq: ['$_id', '$$commenterId'] } } },
				{ $project: { firstName: 1, lastName: 1, email: 1 } }
			],
			as: 'commenter'
		};
		const aggregate = [{ $match: fields }, { $lookup: lookup }, { $unwind: { path: '$commenter' } }];
		try {
			const result = await this._db.collection(this._table).aggregate(aggregate).toArray();
			return await result;
		} catch (error) {
			return Promise.reject(error.message);
		}
	}

}
