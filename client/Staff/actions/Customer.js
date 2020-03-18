export function createCustomer(customer) {
	return async (dispatch) => {
		const response = await fetch(`/api/customers`, {
			credentials: 'same-origin',
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(customer)
		});
		const responseJson = await response.json();
		dispatch(createCustomerSuccess(responseJson.result));
	};
};

export function createCustomerSuccess(customer) {
	return { type: 'CREATE_CUSTOMER', customer };
}

export function listCustomer() {
	return async (dispatch) => {
		const response = await fetch(`/api/customers`, { credentials: 'same-origin' });
		const responseJson = await response.json();
		dispatch(listCustomerSuccess(responseJson.result));
	}
}

export function listCustomerSuccess(list) {
	return { type: 'LIST_CUSTOMER', list };
}

export function getCustomerDetails(id) {
	return async (dispatch) => {
		let response = await fetch(`/api/customers/${id}`, { credentials: 'same-origin' });
		let responseJson = await response.json();
		const customer = responseJson.result;
		dispatch(getCustomerDetailsSuccess(customer));
	};
}

export function getCustomerDetailsSuccess(customer) {
	return { type: 'GET_CUSTOMER_DETAILS', customer };
}

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
}

export function updateCustomerSuccess(customer) {
	return { type: 'UPDATE_CUSTOMER', customer };
}

export function deleteCustomer(id) {
	return async (dispatch) => {
		let response = await fetch(`/api/customers/${id}`, {
			credentials: 'same-origin',
			method: 'delete'
		});
		let responseJson = await response.json();
		dispatch(deleteCustomerSuccess(id));
	};
}

export function deleteCustomerSuccess(id) {
	return { type: 'DELETE_CUSTOMER', id };
}
