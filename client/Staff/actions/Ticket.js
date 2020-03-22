export function createTicket(ticket) {
	return async (dispatch) => {
		const response = await fetch(`/api/tickets`, {
			credentials: 'same-origin',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(ticket)
		});
		const responseJson = await response.json();
		dispatch(createTicketSuccess(responseJson.result));
	};
};

export function createTicketSuccess(ticket) {
	return { type: 'CREATE_TICKET', ticket };
}

export function listTicket(query = {}) {
	return async (dispatch) => {
		const queryString = Object.keys(query).map((key) => (key + '=' + query[key])).join('&');
		const url = '/api/tickets' + (Object.keys(query).length > 0 ? '?' + queryString : '');
		const response = await fetch(url, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(listTicketSuccess(responseJson.result));
	}
}

export function listTicketSuccess(list) {
	return { type: 'LIST_TICKET', list };
}
