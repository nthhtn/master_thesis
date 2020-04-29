const initialState = {
	list: [],
	current: {
		id: null, title: '', message: '', createdAt: null, status: '', severity: '',
		owner: { email: '', fullName: '' },
		sector: { name: '', color: '' },
		issue: { name: '', color: '' },
		assignee: { firstName: '', lastName: '', email: '' }
	},
	comments: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_TICKET': return { ...state, list: [action.ticket, ...state.list] };
		case 'LIST_TICKET': return { ...state, list: action.list };
		case 'LIST_TICKET_COMMENT': return { ...state, comments: action.comments };
		case 'ADD_TICKET_COMMENT': return { ...state, comments: [...state.comments, action.comment] };
		case 'GET_TICKET_DETAILS': return { ...state, current: action.ticket };
		case 'UPDATE_TICKET': return {
			...state,
			list: state.list.map((item) => item._id === action.ticket._id ? { ...item, ...action.ticket } : item),
			current: { ...state.current, ...action.ticket }
		};
		default: return state;
	}
};
