const initialState = {
	list: [],
	current: { _id: null, fullname: '', email: '', phone: '', address: '', note: '' }
};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_CUSTOMER': return { ...state, list: [action.conversation, ...state.list] };
		case 'LIST_CUSTOMER': return { ...state, list: action.list };
		case 'UPDATE_CUSTOMER': return {
			...state,
			list: state.list.map((item) => item.id === action.id ? { ...item, ...action.data } : item),
			current: { ...state.current, ...action.data }
		};
		case 'DELETE_CUSTOMER': return { ...state, list: state.list.filter((item) => item.id !== action.id) };
		case 'GET_CUSTOMER_DETAILS': return { ...state, current: action.customer };
		default: return state;
	}
};
