import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import IndexPage from './IndexPage';
import Workgroup from './Workgroup';
import WorkgroupDetails from './WorkgroupDetails';
import ConversationDetails from './ConversationDetails';
import Customer from './Customer';
import CustomerDetails from './CustomerDetails';
import TicketDetails from './TicketDetails';
import Ticket from './Ticket';
import TicketSector from './TicketSector';
import TaskDetails from './TaskDetails';
import User from './User';
import Issue from './Issue';

class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Switch>
				<Route path='/dashboard' component={IndexPage} />
				<Route exact path='/workgroups'
					render={() => <Workgroup {...this.props} />} />
				<Route path='/workgroups/:id'
					render={(props) => <WorkgroupDetails {...this.props} {...props} />} />
				<Route exact path='/conversations/:id'
					render={(props) => <ConversationDetails {...this.props} {...props} />} />
				<Route exact path='/customers'
					render={(props) => <Customer {...this.props} {...props} />} />
				<Route exact path='/customers/:id'
					render={(props) => <CustomerDetails {...this.props} {...props} />} />
				<Route exact path='/tickets'
					render={(props) => <Ticket {...this.props} {...props} />} />
				<Route exact path='/tickets/:id'
					render={(props) => <TicketDetails {...this.props} {...props} />} />
				<Route exact path='/ticketsectors'
					render={() => <TicketSector {...this.props} />} />
				<Route exact path='/tasks/:id'
					render={(props) => <TaskDetails {...this.props} {...props} />} />
				<Route exact path='/users'
					render={() => <User {...this.props} />} />
				<Route exact path='/issues'
					render={() => <Issue {...this.props} />} />
				<Route path='*' component={IndexPage} />
			</Switch>
		);
	}

}

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps)(Main);
