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
}

export function listWorkgroup() {
	return async (dispatch) => {
		const response = await fetch(`/api/workgroups`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(listWorkgroupSuccess(responseJson.result));
	}
}

export function listWorkgroupSuccess(list) {
	return { type: 'LIST_WORKGROUP', list };
}
