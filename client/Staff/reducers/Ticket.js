const initialState = {
	list: [],
	current: {
		id: null, title: '', message: '', createdAt: null
	},
	comments: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_TICKET': return { ...state, list: [action.ticket, ...state.list] };
		case 'LIST_TICKET': return { ...state, list: action.list };
		case 'LIST_TICKET_COMMENT': return { ...state, comments: action.comments };
		case 'ADD_TICKET_COMMENT': return { ...state, comments: [...state.comments, action.comment] };
		default: return state;
	}
};
