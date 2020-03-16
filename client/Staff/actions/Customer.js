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
