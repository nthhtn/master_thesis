const initialState = { list: [] };

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_TICKET_SECTOR': return { ...state, list: [action.sector, ...state.list] };
		case 'LIST_TICKET_SECTOR': return { ...state, list: action.list };
		case 'UPDATE_TICKET_SECTOR': return {
			...state,
			list: state.list.map((item) => item._id === action.sector._id ? { ...item, ...action.sector } : item)
		};
		case 'DELETE_TICKET_SECTOR': return { ...state, list: state.list.filter((item) => item._id !== action.id) };
		default: return state;
	}
};
