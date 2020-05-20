const initialState = {
	current: { _id: null, fullName: '', email: '', phone: '', address: '', note: '' }
};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'GET_CUSTOMER_DETAILS': return { ...state, current: action.customer };
		default: return state;
	}
};
