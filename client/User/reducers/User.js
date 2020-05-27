const initialState = {
	list: [],
	me: { firstName: '', lastName: '', email: '', phone: '', address: '', role: '' }
};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'GET_MY_PROFILE': return { ...state, me: action.result };
		case 'CREATE_USER': return { ...state, list: [...state.list, action.user] };
		case 'LIST_USER': return { ...state, list: action.list };
		default: return state;
	}
};
