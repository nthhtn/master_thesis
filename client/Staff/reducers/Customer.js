const initialState = {
	list: [],
	current: { _id: null, fullname: '', email: '', phone: '', address: '', note: '' },
	tickets: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_CUSTOMER': return { ...state, list: [action.conversation, ...state.list] };
		case 'LIST_CUSTOMER': return { ...state, list: action.list };
		default: return state;
	}
};
