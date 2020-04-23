const initialState = { list: [] };

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_ISSUE': return { ...state, list: [action.issue, ...state.list] };
		case 'LIST_ISSUE': return { ...state, list: action.list };
		case 'UPDATE_ISSUE': return {
			...state,
			list: state.list.map((item) => item._id === action.issue._id ? { ...item, ...action.issue } : item)
		};
		case 'DELETE_ISSUE': return { ...state, list: state.list.filter((item) => item._id !== action.id) };
		default: return state;
	}
};
