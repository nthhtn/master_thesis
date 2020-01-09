import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Sidebar extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<nav id="sidebar">
				<div className="simplebar-scroll-content" style={{ paddingRight: '15px', marginBottom: '-30px' }}>
					<div className="simplebar-content" style={{ paddingBottom: '15px', marginRight: '-15px' }}>
						<div className="content-header bg-white-5">
							<a className="font-w600 text-dual" href="index.html">
								<i className="fa fa-circle-notch text-primary"></i>
								<span className="smini-hide">
									<span className="font-w700 font-size-h5">ne</span> <span className="font-w400">4.2</span>
								</span>
							</a>
							<a className="d-lg-none text-dual ml-3" data-toggle="layout" data-action="sidebar_close" href={undefined} onClick={(e) => e.preventDefault()}>
								<i className="fa fa-times"></i>
							</a>
						</div>
						<div className="content-side content-side-full">
							<ul className="nav-main">
								<li className="nav-main-item">
									<Link className="nav-main-link active" to="/dashboard">
										<i className="nav-main-link-icon si si-speedometer"></i>
										<span className="nav-main-link-name">Dashboard</span>
									</Link>
								</li>
								<li className="nav-main-item">
									<Link className="nav-main-link active" to="/logout">
										<i className="nav-main-link-icon si si-logout"></i>
										<span className="nav-main-link-name">Logout</span>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		);
	}

};
