export function createConversation(conversation) {
	return async (dispatch) => {
		const response = await fetch(`/api/conversations`, {
			credentials: 'same-origin',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(conversation)
		});
		const responseJson = await response.json();
		dispatch(createConversationSuccess(responseJson.result));
	};
};

export function createConversationSuccess(conversation) {
	return { type: 'CREATE_CONVERSATION', conversation };
}

export function listConversation() {
	return async (dispatch) => {
		const response = await fetch(`/api/conversations`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(listConversationSuccess(responseJson.result));
	}
}

export function listConversationSuccess(list) {
	return { type: 'LIST_CONVERSATION', list };
}
