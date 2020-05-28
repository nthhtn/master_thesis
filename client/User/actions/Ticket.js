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
		response = await fetch(`/api/customers/${ticket.ownerId}`, { credentials: 'same-origin' });
		responseJson = await response.json();
		const owner = responseJson.result;
		let sector = null;
		if (ticket.sectorId) {
			response = await fetch(`/api/ticketsectors/${ticket.sectorId}`, { credentials: 'same-origin' });
			responseJson = await response.json();
			sector = responseJson.result;
		}
		let issue = null;
		if (ticket.issueId) {
			response = await fetch(`/api/issues/${ticket.issueId}`, { credentials: 'same-origin' });
			responseJson = await response.json();
			issue = responseJson.result;
		}
		let assignee = null;
		if (ticket.assigneeId) {
			response = await fetch(`/api/users/${ticket.assigneeId}`, { credentials: 'same-origin' });
			responseJson = await response.json();
			assignee = responseJson.result;
		}
		dispatch(getTicketDetailsSuccess({ ...ticket, owner, sector, issue, assignee }));
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

export function updateTicket(id, data, assignee) {
	return async (dispatch) => {
		let response = await fetch(`/api/tickets/${id}`, {
			credentials: 'same-origin',
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
		let responseJson = await response.json();
		const ticket = responseJson.result;
		response = await fetch(`/api/ticketsectors/${ticket.sectorId}`, { credentials: 'same-origin' });
		responseJson = await response.json();
		const sector = responseJson.result;
		response = await fetch(`/api/issues/${ticket.issueId}`, { credentials: 'same-origin' });
		responseJson = await response.json();
		const issue = responseJson.result;
		dispatch(updateTicketSuccess({ ...ticket, sector, issue, assignee }));
	};
};

export function updateTicketSuccess(ticket) {
	return { type: 'UPDATE_TICKET', ticket };
};