import { ObjectID } from 'mongodb';

// let task = {
// 	_id: 'string',
// 	name: 'string',
// 	description: 'string',
// 	status: 'string',
// 	priority: 'string',
// 	creatorId: 'string',
// 	assigneeId: 'string',
// 	workgroupId: 'string',
// 	parentId: 'string',
// 	dueAt: 'number'
// };

export default class TaskModel {

	constructor(db) {
		this._db = db;
		this._table = 'task';
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

	async lookupByFields(fields = {}) {
		const lookupWorkgroup = {
			from: 'workgroup',
			let: { workgroupId: '$workgroupId' },
			pipeline: [
				{ $match: { $expr: { $eq: ['$_id', '$$workgroupId'] } } },
				{ $project: { name: 1 } }
			],
			as: 'workgroup'
		};
		const lookupAssignee = {
			from: 'user',
			let: { assigneeId: '$assigneeId' },
			pipeline: [
				{ $match: { $expr: { $eq: ['$_id', '$$assigneeId'] } } },
				{ $project: { firstName: 1, lastName: 1, email: 1 } }
			],
			as: 'assignee'
		};
		const aggregate = [{ $match: fields },
		{ $lookup: lookupWorkgroup }, { $unwind: { path: '$workgroup', preserveNullAndEmptyArrays: true } },
		{ $lookup: lookupAssignee }, { $unwind: { path: '$assignee', preserveNullAndEmptyArrays: true } }];
		try {
			const result = await this._db.collection(this._table).aggregate(aggregate).toArray();
			return await result;
		} catch (error) {
			return Promise.reject(error.message);
		}
	}

}
