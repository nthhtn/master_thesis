import { combineReducers } from 'redux';

import workgroup from './Workgroup';
import conversation from './Conversation';
import user from './User';

export default combineReducers({ workgroup, conversation, user });
