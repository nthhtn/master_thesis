import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import IndexPage from './IndexPage';
import Workgroup from './Workgroup';
import ConversationDetails from './ConversationDetails';
import WorkgroupDetails from './WorkgroupDetails';
import Customer from './Customer';
import CustomerDetails from './CustomerDetails';
import TicketDetails from './TicketDetails';
import Ticket from './Ticket';
import TicketSector from './TicketSector';

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
				<Route path='*' component={IndexPage} />
			</Switch>
		);
	}

}

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps)(Main);
