const initialState = {
	list: [],
	current: { _id: null, title: '', content: '' },
	comments: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_CONVERSATION': return { ...state, list: [action.conversation, ...state.list] };
		case 'LIST_CONVERSATION': return { ...state, list: action.list };
		case 'UPDATE_CONVERSATION': return { ...state, list: state.list.map((item) => item.id === action.id ? { ...item, ...action.data } : item) };
		case 'DELETE_CONVERSATION': return { ...state, list: state.list.filter((item) => item.id !== action.id) };
		default: return state;
	}
};
