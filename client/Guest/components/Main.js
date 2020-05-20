import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Profile from './Profile';
import TicketDetails from './TicketDetails';

class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Switch>
				<Route exact path="/profile"
					render={(props) => <Profile {...this.props} {...props} />} />
				<Route exact path='/tickets/:id'
					render={(props) => <TicketDetails {...this.props} {...props} />} />
				<Route path='*'
					render={(props) => <Profile {...this.props} {...props} />} />
			</Switch>
		);
	}

}

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps)(Main);
