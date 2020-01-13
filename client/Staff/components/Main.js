import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './Home';
import WorkgroupGrid from './WorkgroupGrid';
import Conversation from './Conversation';

class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Switch>
				<Route exact path='/dashboard' component={Home} />
				<Route exact path='/workgroups' component={WorkgroupGrid} />
				<Route exact path='/conversations' component={Conversation} />
				<Route path='*' component={Home} />
			</Switch>
		);
	}

}

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps)(Main);
