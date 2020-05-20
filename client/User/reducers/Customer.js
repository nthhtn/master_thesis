const initialState = {
	list: [],
	current: { _id: null, fullName: '', email: '', phone: '', address: '', note: '' }
};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_CUSTOMER': return { ...state, list: [action.customer, ...state.list] };
		case 'LIST_CUSTOMER': return { ...state, list: action.list };
		case 'GET_CUSTOMER': return { ...state, current: action.customer };
		case 'UPDATE_CUSTOMER': return {
			...state,
			list: state.list.map((item) => item._id === action.customer._id ? { ...item, ...action.customer } : item),
			current: { ...state.current, ...action.customer }
		};
		case 'DELETE_CUSTOMER': return { ...state, list: state.list.filter((item) => item._id !== action.id) };
		case 'GET_CUSTOMER_DETAILS': return { ...state, current: action.customer };
		default: return state;
	}
};
