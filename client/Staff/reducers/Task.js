const initialState = {
	list: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_TASK': return { ...state, list: [action.conversation, ...state.list] };
		case 'LIST_TASK': return { ...state, list: action.list };
		default: return state;
	}
};
