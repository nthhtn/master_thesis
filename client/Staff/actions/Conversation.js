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

export function listConversation(query = {}) {
	return async (dispatch) => {
		const queryString = Object.keys(query).map((key) => (key + '=' + query[key])).join('&');
		const url = '/api/conversations' + (Object.keys(query).length > 0 ? '?' + queryString : '');
		const response = await fetch(url, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(listConversationSuccess(responseJson.result));
	};
}

export function listConversationSuccess(list) {
	return { type: 'LIST_CONVERSATION', list };
}


export function getConversationDetails(id) {
	return async (dispatch) => {
		let response = await fetch(`/api/conversations/${id}`, { credentials: 'same-origin' });
		let responseJson = await response.json();
		const conversation = responseJson.result;
		response = await fetch(`/api/users/${conversation.creatorId}`, { credentials: 'same-origin' });
		responseJson = await response.json();
		const creator = responseJson.result;
		dispatch(getConversationDetailsSuccess({ ...conversation, creator }));
	};
}

export function getConversationDetailsSuccess(conversation) {
	return { type: 'GET_CONVERSATION_DETAILS', conversation };
}

export function addConversationComment(conversationId, comment, commenter) {
	return async (dispatch) => {
		const url = '/api/conversations/' + conversationId + '/comments';
		const response = await fetch(url, {
			credentials: 'same-origin',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(comment)
		});
		const responseJson = await response.json();
		dispatch(addConversationCommentSuccess({ ...responseJson.result, commenter }));
	};
};

export function addConversationCommentSuccess(comment) {
	return { type: 'ADD_CONVERSATION_COMMENT', comment };
}

export function listConversationComment(conversationId) {
	return async (dispatch) => {
		const url = '/api/conversations/' + conversationId + '/comments';
		const response = await fetch(url, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(listConversationCommentSuccess(responseJson.result));
	};
}

export function listConversationCommentSuccess(comments) {
	return { type: 'LIST_CONVERSATION_COMMENT', comments };
}
