const initialState = {
	list: [],
	current: {
		_id: null, name: '', description: '', createdAt: null, dueAt: null, status: '', priority: '',
		workgroup: { _id: null, name: '' },
		parent: { name: '' },
		assignee: { _id: null, firstName: '', lastName: '', email: '' },
		children: []
	}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case 'CREATE_TASK': return { ...state, list: [action.task, ...state.list] };
		case 'LIST_TASK': return { ...state, list: action.list };
		case 'GET_TASK_DETAILS': return { ...state, current: action.task };
		default: return state;
	}
};
