import { combineReducers } from 'redux';

import workgroup from './Workgroup';
import conversation from './Conversation';
import user from './User';
import task from './Task';
import ticket from './Ticket';
import customer from './Customer';

export default combineReducers({ workgroup, conversation, user, task, customer, ticket });
