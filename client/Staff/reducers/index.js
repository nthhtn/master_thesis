import { combineReducers } from 'redux';

import workgroup from './Workgroup';
import conversation from './Conversation';

export default combineReducers({ workgroup, conversation });
