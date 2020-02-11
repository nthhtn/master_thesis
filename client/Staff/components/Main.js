import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './Home';
import WorkgroupGrid from './WorkgroupGrid';
import Conversation from './Conversation';
import Workgroup from './Workgroup';

class Main extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Switch>
				<Route path='/dashboard' component={Home} />
				<Route exact path='/workgroups'
					render={() => (<WorkgroupGrid {...this.props} />)} />
				<Route path='/workgroups/:id'
					render={(props) => (<Workgroup {...this.props} {...props} />)} />
				<Route exact path='/conversations/:id' component={Conversation} />
				<Route path='*' component={Home} />
			</Switch>
		);
	}

}

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps)(Main);
