const initialState = { listWorkgroup: [] };

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_WORKGROUP': return { listWorkgroup: [action.workgroup, ...state.listWorkgroup] };
		case 'LIST_WORKGROUP': return { listWorkgroup: action.list };
		case 'UPDATE_WORKGROUP': return { listWorkgroup: state.listWorkgroup.map((item) => item.id === action.id ? { ...item, ...action.data } : item) };
		case 'DELETE_WORKGROUP': return { listWorkgroup: state.listWorkgroup.filter((item) => item.id !== action.id) };
		default: return state;
	}
};
