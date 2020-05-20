import { combineReducers } from 'redux';

import user from './User';
import customer from './Customer';
import ticket from './Ticket';

export default combineReducers({ user, customer, ticket });
