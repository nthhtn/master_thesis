import { ObjectID } from 'mongodb';

// let workgroupMember = {
// 	_id: 'string',
// 	workgroupId: 'string',
// 	userId: 'string',
// };

export default class WorkgroupMemberModel {

	constructor(db) {
		this._db = db;
		this._table = 'workgroupMember';
	}

	async create(data) {
		data._id = new ObjectID().toString();
		try {
			await this._db.collection(this._table).insertOne(data);
			return Promise.resolve(data);
		} catch (error) {
			return Promise.reject(error.message);
		}
	}

	async createMany(list) {
		list = list.map((item) => ({ ...item, _id: new ObjectID().toString() }));
		try {
			await this._db.collection(this._table).insertMany(list);
			return Promise.resolve(list);
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

	async lookup(fields = {}) {
		const lookup = {
			from: 'user',
			localField: 'userId',
			foreignField: '_id',
			as: 'members'
		};
		const aggregate = [{ $match: fields }, { $lookup: lookup }];
		try {
			const result = await this._db.collection(this._table).aggregate(aggregate).toArray();
			return result;
		} catch (error) {
			return Promise.reject(error.message);
		}
	}

	async lookupMembersByWorkgroup(workgroupId) {
		const lookup = {
			from: 'user',
			let: { memberId: '$userId' },
			pipeline: [
				{ $match: { $expr: { $eq: ['$_id', '$$memberId'] } } },
				{ $project: { firstName: 1, lastName: 1, email: 1 } }
			],
			as: 'members'
		};
		const aggregate = [{ $match: { workgroupId } }, { $lookup: lookup }];
		try {
			const result = await this._db.collection(this._table).aggregate(aggregate).toArray();
			return result[0];
		} catch (error) {
			console.log(error);
			return Promise.reject(error.message);
		}
	}

}
