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
					render={() => (<WorkgroupGrid workgroup={this.props.workgroup} dispatch={this.props.dispatch} />)} />
				<Route path='/workgroups/:id'
					render={() => (<Workgroup conversation={this.props.conversation} dispatch={this.props.dispatch} />)} />
				<Route exact path='/conversations/:id' component={Conversation} />
				<Route path='*' component={Home} />
			</Switch>
		);
	}

}

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps)(Main);
