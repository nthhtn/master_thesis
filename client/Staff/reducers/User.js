const initialState = {
	list: [],
	me: { firstName: '', lastName: '', email: '', phone: '', address: '', userType: '' }
};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'GET_MY_PROFILE': return { ...state, me: action.result };
		case 'LIST_USER': return { ...state, list: action.list };
		default: return state;
	}
};
