import { ObjectID } from 'mongodb';

// let ticket = {
// 	_id: 'string',
// 	title: 'string',
// 	message: 'string',
// 	status: 'string',
// 	ownerId: 'string',
// 	assigneeId: 'string',
// 	issueId: 'string',
// 	sectorId: 'string'
// };

export default class TicketModel {

	constructor(db) {
		this._db = db;
		this._table = 'ticket';
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
		const lookupOwner = {
			from: 'customer',
			let: { ownerId: '$ownerId' },
			pipeline: [
				{ $match: { $expr: { $eq: ['$_id', '$$ownerId'] } } },
				{ $project: { fullname: 1, email: 1 } }
			],
			as: 'owner'
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
		const lookupSector = {
			from: 'ticketSector',
			let: { sectorId: '$sectorId' },
			pipeline: [
				{ $match: { $expr: { $eq: ['$_id', '$$sectorId'] } } },
				{ $project: { name: 1 } }
			],
			as: 'sector'
		};
		const aggregate = [{ $match: fields },
		{ $lookup: lookupOwner }, { $unwind: { path: '$owner', preserveNullAndEmptyArrays: true } },
		{ $lookup: lookupAssignee }, { $unwind: { path: '$assignee', preserveNullAndEmptyArrays: true } },
		{ $lookup: lookupSector }, { $unwind: { path: '$sector', preserveNullAndEmptyArrays: true } }];
		try {
			const result = await this._db.collection(this._table).aggregate(aggregate).toArray();
			return await result;
		} catch (error) {
			return Promise.reject(error.message);
		}
	}

}
