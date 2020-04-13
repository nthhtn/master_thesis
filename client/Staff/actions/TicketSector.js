export function createTicketSector(sector) {
	return async (dispatch) => {
		const response = await fetch(`/api/ticketsectors`, {
			credentials: 'same-origin',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(sector)
		});
		const responseJson = await response.json();
		dispatch(createTicketSectorSuccess(responseJson.result));
	};
};

export function createTicketSectorSuccess(sector) {
	return { type: 'CREATE_TICKET_SECTOR', sector };
}

export function listTicketSector() {
	return async (dispatch) => {
		const response = await fetch(`/api/ticketsectors`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(listTicketSectorSuccess(responseJson.result));
	}
}

export function listTicketSectorSuccess(list) {
	return { type: 'LIST_TICKET_SECTOR', list };
}

export function updateTicketSector(id, data) {
	return async (dispatch) => {
		let response = await fetch(`/api/ticketsectors/${id}`, {
			credentials: 'same-origin',
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
		let responseJson = await response.json();
		const sector = responseJson.result;
		dispatch(updateTicketSectorSuccess(sector));
	};
}

export function updateTicketSectorSuccess(sector) {
	return { type: 'UPDATE_TICKET_SECTOR', sector };
}

export function deleteTicketSector(id) {
	return async (dispatch) => {
		let response = await fetch(`/api/ticketsectors/${id}`, {
			credentials: 'same-origin',
			method: 'delete'
		});
		let responseJson = await response.json();
		dispatch(deleteTicketSectorSuccess(id));
	};
}

export function deleteTicketSectorSuccess(id) {
	return { type: 'DELETE_TICKET_SECTOR', id };
}
