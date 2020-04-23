export function createIssue(issue) {
	return async (dispatch) => {
		const response = await fetch(`/api/issues`, {
			credentials: 'same-origin',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(issue)
		});
		const responseJson = await response.json();
		dispatch(createIssueSuccess(responseJson.result));
	};
};

export function createIssueSuccess(issue) {
	return { type: 'CREATE_ISSUE', issue };
};

export function listIssue() {
	return async (dispatch) => {
		const response = await fetch(`/api/issues`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(listIssueSuccess(responseJson.result));
	};
};

export function listIssueSuccess(list) {
	return { type: 'LIST_ISSUE', list };
};

export function updateIssue(id, data) {
	return async (dispatch) => {
		let response = await fetch(`/api/issues/${id}`, {
			credentials: 'same-origin',
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
		let responseJson = await response.json();
		const issue = responseJson.result;
		dispatch(updateIssueSuccess(issue));
	};
};

export function updateIssueSuccess(issue) {
	return { type: 'UPDATE_ISSUE', issue };
}

export function deleteIssue(id) {
	return async (dispatch) => {
		let response = await fetch(`/api/issues/${id}`, {
			credentials: 'same-origin',
			method: 'delete'
		});
		let responseJson = await response.json();
		dispatch(deleteIssueSuccess(id));
	};
};

export function deleteIssueSuccess(id) {
	return { type: 'DELETE_ISSUE', id };
};
