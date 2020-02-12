export function addConversationComment(comment, commenter) {
	return async (dispatch) => {
		const response = await fetch(`/api/conversation_comments`, {
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

export function listConversationComment(query = {}) {
	return async (dispatch) => {
		const queryString = Object.keys(query).map((key) => (key + '=' + query[key])).join('&');
		const url = '/api/conversation_comments' + (Object.keys(query).length > 0 ? '?' + queryString : '');
		const response = await fetch(url, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(listConversationCommentSuccess(responseJson.result));
	};
}

export function listConversationCommentSuccess(comments) {
	return { type: 'LIST_CONVERSATION_COMMENT', comments };
}
