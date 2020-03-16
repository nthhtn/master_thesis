export function createTask(task) {
	return async (dispatch) => {
		const response = await fetch(`/api/tasks`, {
			credentials: 'same-origin',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(task)
		});
		const responseJson = await response.json();
		dispatch(createTaskSuccess(responseJson.result));
	};
};

export function createTaskSuccess(task) {
	return { type: 'CREATE_TASK', task };
}

export function listTask() {
	return async (dispatch) => {
		const response = await fetch(`/api/tasks`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(listTaskSuccess(responseJson.result));
	}
}

export function listTaskSuccess(list) {
	return { type: 'LIST_TASK', list };
}
