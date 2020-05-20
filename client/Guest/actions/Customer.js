import { listTicket } from './Ticket';

export function getCustomerDetails(id) {
	return async (dispatch) => {
		let response = await fetch(`/api/customers/${id}`, { credentials: 'same-origin' });
		let responseJson = await response.json();
		const customer = responseJson.result;
		dispatch(getCustomerDetailsSuccess(customer));
		dispatch(listTicket({ ownerId: id }));
	};
};

export function getCustomerDetailsSuccess(customer) {
	return { type: 'GET_CUSTOMER_DETAILS', customer };
};

export function updateCustomer(id, data) {
	return async (dispatch) => {
		let response = await fetch(`/api/customers/${id}`, {
			credentials: 'same-origin',
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});
		let responseJson = await response.json();
		const customer = responseJson.result;
		dispatch(updateCustomerSuccess(customer));
	};
};

export function updateCustomerSuccess(customer) {
	return { type: 'UPDATE_CUSTOMER', customer };
};
