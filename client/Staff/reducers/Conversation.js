const initialState = {
	list: [],
	current: { _id: null, title: '', content: '', createdAt: null },
	comments: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_CONVERSATION': return { ...state, list: [action.conversation, ...state.list] };
		case 'LIST_CONVERSATION': return { ...state, list: action.list };
		case 'UPDATE_CONVERSATION': return { ...state, list: state.list.map((item) => item.id === action.id ? { ...item, ...action.data } : item) };
		case 'DELETE_CONVERSATION': return { ...state, list: state.list.filter((item) => item.id !== action.id) };
		case 'GET_CONVERSATION_DETAILS': return { ...state, current: action.conversation };
		case 'LIST_CONVERSATION_COMMENT': return { ...state, comments: action.comments };
		case 'ADD_CONVERSATION_COMMENT': return { ...state, comments: [...state.comments, action.comment] };
		default: return state;
	}
};
