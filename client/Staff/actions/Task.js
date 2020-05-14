export function createTask(task, assignee) {
	return async (dispatch) => {
		const response = await fetch(`/api/tasks`, {
			credentials: 'same-origin',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(task)
		});
		const responseJson = await response.json();
		const result = { ...responseJson.result, assignee };
		dispatch(createTaskSuccess(result));
	};
};

export function createTaskSuccess(task) {
	return { type: 'CREATE_TASK', task };
};

export function listTask(query = {}) {
	return async (dispatch) => {
		const queryString = Object.keys(query).map((key) => (key + '=' + query[key])).join('&');
		const url = '/api/tasks' + (Object.keys(query).length > 0 ? '?' + queryString : '');
		const response = await fetch(url, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(listTaskSuccess(responseJson.result));
	}
};

export function listTaskSuccess(list) {
	return { type: 'LIST_TASK', list };
};

export function getTaskDetails(id) {
	return async (dispatch) => {
		let response = await fetch(`/api/tasks/${id}`, { credentials: 'same-origin' });
		let responseJson = await response.json();
		const task = responseJson.result;
		response = await fetch(`/api/workgroups/${task.workgroupId}`, { credentials: 'same-origin' });
		responseJson = await response.json();
		const workgroup = responseJson.result;
		let assignee = null;
		if (task.assigneeId) {
			response = await fetch(`/api/users/${task.assigneeId}`, { credentials: 'same-origin' });
			responseJson = await response.json();
			assignee = responseJson.result;
		}
		let parent = null;
		if (task.parentId) {
			response = await fetch(`/api/tasks/${task.parentId}`, { credentials: 'same-origin' });
			responseJson = await response.json();
			parent = responseJson.result;
		}
		dispatch(getTaskDetailsSuccess({ ...task, workgroup, assignee, parent }));
	};
};

export function getTaskDetailsSuccess(task) {
	return { type: 'GET_TASK_DETAILS', task };
};

export function updateTask(id, data) {
	return async (dispatch) => {
		let response = await fetch(`/api/tasks/${id}`, {
			credentials: 'same-origin',
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
		let responseJson = await response.json();
		const task = responseJson.result;
		dispatch(updateTaskSuccess({ ...task }));
	};
};

export function updateTaskSuccess(task) {
	return { type: 'UPDATE_TASK', task };
};
