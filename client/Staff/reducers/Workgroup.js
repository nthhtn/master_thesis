const initialState = {
	list: [],
	current: { _id: null, name: '', description: '', members: [] }
};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_WORKGROUP': return { ...state, list: [action.workgroup, ...state.list] };
		case 'LIST_WORKGROUP': return { ...state, list: action.list };
		case 'UPDATE_WORKGROUP': return { ...state, list: state.list.map((item) => item._id === action.id ? { ...item, ...action.data } : item) };
		case 'DELETE_WORKGROUP': return { ...state, list: state.list.filter((item) => item._id !== action.id) };
		case 'GET_WORKGROUP_DETAILS': return { ...state, current: action.workgroup };
		default: return state;
	}
};
