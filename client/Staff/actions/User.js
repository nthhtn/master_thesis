export function getMyProfile() {
	return async (dispatch) => {
		const response = await fetch(`/api/me`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(getMyProfileSuccess(responseJson.result));
	};
};

export function getMyProfileSuccess(result) {
	return { type: 'GET_MY_PROFILE', result };
};

export function createUser(user) {
	return async (dispatch) => {
		const response = await fetch(`/api/users`, {
			credentials: 'same-origin',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user)
		});
		const responseJson = await response.json();
		dispatch(createUserSuccess(responseJson.result));
	};
};

export function createUserSuccess(user) {
	return { type: 'CREATE_USER', user };
};

export function listUser() {
	return async (dispatch) => {
		const response = await fetch(`/api/users`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(listUserSuccess(responseJson.result));
	};
};

export function listUserSuccess(list) {
	return { type: 'LIST_USER', list };
};
