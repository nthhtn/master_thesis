const initialState = { listConversation: [] };

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_CONVERSATION': return { listConversation: [action.conversation, ...state.listConversation] };
		case 'LIST_CONVERSATION': return { listConversation: action.list };
		case 'UPDATE_CONVERSATION': return { listConversation: state.listConversation.map((item) => item.id === action.id ? { ...item, ...action.data } : item) };
		case 'DELETE_CONVERSATION': return { listConversation: state.listConversation.filter((item) => item.id !== action.id) };
		default: return state;
	}
};
