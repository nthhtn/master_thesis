export function createTicket(ticket, owner) {
	return async (dispatch) => {
		const response = await fetch(`/api/tickets`, {
			credentials: 'same-origin',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(ticket)
		});
		const responseJson = await response.json();
		const result = { ...responseJson.result, owner };
		dispatch(createTicketSuccess(result));
	};
};

export function createTicketSuccess(ticket) {
	return { type: 'CREATE_TICKET', ticket };
};

export function listTicket(query = {}) {
	return async (dispatch) => {
		const queryString = Object.keys(query).map((key) => (key + '=' + query[key])).join('&');
		const url = '/api/tickets' + (Object.keys(query).length > 0 ? '?' + queryString : '');
		const response = await fetch(url, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(listTicketSuccess(responseJson.result));
	};
};

export function listTicketSuccess(list) {
	return { type: 'LIST_TICKET', list };
};

export function getTicketDetails(id) {
	return async (dispatch) => {
		let response = await fetch(`/api/tickets/${id}`, { credentials: 'same-origin' });
		let responseJson = await response.json();
		const ticket = responseJson.result;
		dispatch(getTicketDetailsSuccess({ ...ticket }));
	};
};

export function getTicketDetailsSuccess(ticket) {
	return { type: 'GET_TICKET_DETAILS', ticket };
};

export function addTicketComment(ticketId, comment, commenter) {
	return async (dispatch) => {
		const url = '/api/tickets/' + ticketId + '/comments';
		const response = await fetch(url, {
			credentials: 'same-origin',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(comment)
		});
		const responseJson = await response.json();
		dispatch(addTicketCommentSuccess({ ...responseJson.result, commenter }));
	};
};

export function addTicketCommentSuccess(comment) {
	return { type: 'ADD_TICKET_COMMENT', comment };
};

export function listTicketComment(ticketId) {
	return async (dispatch) => {
		const url = '/api/tickets/' + ticketId + '/comments';
		const response = await fetch(url, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(listTicketCommentSuccess(responseJson.result));
	};
};

export function listTicketCommentSuccess(comments) {
	return { type: 'LIST_TICKET_COMMENT', comments };
};
