import { listConversation } from './Conversation';
import { listTask } from './Task';

export function createWorkgroup(workgroup) {
	return async (dispatch) => {
		const response = await fetch(`/api/workgroups`, {
			credentials: 'same-origin',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(workgroup)
		});
		const responseJson = await response.json();
		dispatch(createWorkgroupSuccess(responseJson.result));
	};
};

export function createWorkgroupSuccess(workgroup) {
	return { type: 'CREATE_WORKGROUP', workgroup };
};

export function listWorkgroup() {
	return async (dispatch) => {
		const response = await fetch(`/api/workgroups`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(listWorkgroupSuccess(responseJson.result));
	};
};

export function listWorkgroupSuccess(list) {
	return { type: 'LIST_WORKGROUP', list };
};

export function getWorkgroupDetails(id) {
	return async (dispatch) => {
		let response = await fetch(`/api/workgroups/${id}`, { credentials: 'same-origin' });
		let responseJson = await response.json();
		const workgroup = responseJson.result;
		dispatch(getWorkgroupDetailsSuccess(workgroup));
		dispatch(listConversation({ workgroupId: id }));
		dispatch(listTask({ workgroupId: id }));
	};
};

export function getWorkgroupDetailsSuccess(workgroup) {
	return { type: 'GET_WORKGROUP_DETAILS', workgroup };
};

export function addWorkgroupMembers(id, list) {
	return async (dispatch) => {
		let response = await fetch(`/api/workgroups/${id}/members`, {
			credentials: 'same-origin',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ list: list.map((item) => (item._id)) })
		});
		let responseJson = await response.json();
		const result = responseJson.result;
		dispatch(addWorkgroupMembersSuccess(list));
	};
};

export function addWorkgroupMembersSuccess(list) {
	return { type: 'ADD_WORKGROUP_MEMBERS', list };
};

export function removeWorkgroupMembers(id, list) {
	return async (dispatch) => {
		let response = await fetch(`/api/workgroups/${id}/members`, {
			credentials: 'same-origin',
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ list: list.map((item) => (item._id)) })
		});
		let responseJson = await response.json();
		const result = responseJson.result;
		dispatch(removeWorkgroupMembersSuccess(list));
	};
};

export function removeWorkgroupMembersSuccess(list) {
	return { type: 'REMOVE_WORKGROUP_MEMBERS', list };
};

export function updateWorkgroup(id, data) {
	return async (dispatch) => {
		let response = await fetch(`/api/workgroups/${id}`, {
			credentials: 'same-origin',
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
		let responseJson = await response.json();
		dispatch(updateWorkgroupSuccess(responseJson.result));
	};
};

export function updateWorkgroupSuccess(workgroup) {
	return { type: 'UPDATE_WORKGROUP', workgroup };
};
