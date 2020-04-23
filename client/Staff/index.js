import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import Main from './components/Main';
import store from './store';
import { getMyProfile } from './actions/User';

store.dispatch(getMyProfile()).then(() => {
	const { firstName, lastName } = store.getState().user.me;
	const rootComponent = (
		<Provider store={store}>
			<BrowserRouter>
				<div id="page-container" className="sidebar-o sidebar-dark enable-page-overlay side-scroll page-header-fixed side-trans-enabled">
					<nav id="sidebar" style={{ overflowX: 'hidden' }}>
						<div className="simplebar-scroll-content" style={{ paddingRight: '15px', marginBottom: '-30px' }}>
							<div className="simplebar-content" style={{ paddingBottom: '15px', marginRight: '-15px', overflowX: 'hidden' }}>
								<div className="content-header bg-white-5">
									<a className="font-w600 text-dual" href={undefined}>
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
										<li className="nav-main-heading">Staff Features</li>
										<li className="nav-main-item">
											<Link className="nav-main-link active" to="/dashboard">
												<i className="nav-main-link-icon fa fa-globe"></i>
												<span className="nav-main-link-name">Home</span>
											</Link>
										</li>
										<li className="nav-main-item">
											<Link className="nav-main-link active" to="/workgroups">
												<i className="nav-main-link-icon fa fa-users"></i>
												<span className="nav-main-link-name">Workgroups</span>
											</Link>
										</li>
										<li className="nav-main-item">
											<Link className="nav-main-link active" to="/conversations">
												<i className="nav-main-link-icon fa fa-comment-alt"></i>
												<span className="nav-main-link-name">Conversations</span>
											</Link>
										</li>
										<li className="nav-main-item">
											<Link className="nav-main-link active" to="/tasks">
												<i className="nav-main-link-icon fa fa-tasks"></i>
												<span className="nav-main-link-name">Tasks</span>
											</Link>
										</li>
										<li className="nav-main-item">
											<Link className="nav-main-link active" to="/tickets">
												<i className="nav-main-link-icon fa fa-ticket-alt"></i>
												<span className="nav-main-link-name">Tickets</span>
											</Link>
										</li>
										<li className="nav-main-item">
											<Link className="nav-main-link active" to="/customers">
												<i className="nav-main-link-icon fa fa-user-tie"></i>
												<span className="nav-main-link-name">Customers</span>
											</Link>
										</li>
										<li className="nav-main-heading">Manager Features</li>
										<li className="nav-main-item">
											<Link className="nav-main-link active" to="/ticketsectors">
												<i className="nav-main-link-icon fa fa-layer-group"></i>
												<span className="nav-main-link-name">Ticket Sectors</span>
											</Link>
										</li>
										<li className="nav-main-item">
											<Link className="nav-main-link active" to="/issues">
												<i className="nav-main-link-icon fa fa-file-alt"></i>
												<span className="nav-main-link-name">Issues</span>
											</Link>
										</li>
										<li className="nav-main-item">
											<Link className="nav-main-link active" to="/users">
												<i className="nav-main-link-icon fa fa-users-cog"></i>
												<span className="nav-main-link-name">Users</span>
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</nav>
					<header id="page-header">
						<div className="content-header">
							<div className="d-flex align-items-center">
								<button type="button" className="btn btn-sm btn-dual mr-2 d-lg-none" data-toggle="layout" data-action="sidebar_toggle">
									<i className="fa fa-fw fa-bars"></i>
								</button>
								<button type="button" className="btn btn-sm btn-dual mr-2 d-none d-lg-inline-block" data-toggle="layout" data-action="sidebar_mini_toggle">
									<i className="fa fa-fw fa-ellipsis-v"></i>
								</button>
								<button type="button" className="btn btn-sm btn-dual d-sm-none" data-toggle="layout" data-action="header_search_on">
									<i className="si si-magnifier"></i>
								</button>
								<div className="d-none d-sm-inline-block">
									<div className="input-group input-group-sm">
										<input type="text" className="form-control form-control-alt" placeholder="Search.." id="page-header-search-input2" />
										<div className="input-group-append">
											<span className="input-group-text bg-body border-0">
												<i className="si si-magnifier"></i>
											</span>
										</div>
									</div>
								</div>
							</div>
							<div className="d-flex align-items-center">
								<div className="dropdown d-inline-block ml-2">
									<button type="button" className="btn btn-sm btn-dual" id="page-header-user-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										<img className="rounded" src="/assets/oneui/media/avatars/avatar10.jpg" alt="Header Avatar" style={{ width: '18px' }} />
										<span className="d-none d-sm-inline-block ml-1">{firstName + ' ' + lastName}</span>
										<i className="fa fa-fw fa-angle-down d-none d-sm-inline-block"></i>
									</button>
									<div className="dropdown-menu dropdown-menu-right p-0 border-0 font-size-sm" aria-labelledby="page-header-user-dropdown" x-placement="bottom-end" style={{ position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(104px, 31px, 0px)' }}>
										<div className="p-3 text-center bg-primary">
											<img className="img-avatar img-avatar48 img-avatar-thumb" src="/assets/oneui/media/avatars/avatar10.jpg" alt="" />
										</div>
										<div className="p-2">
											<a className="dropdown-item d-flex align-items-center justify-content-between" href="#">
												<span>Profile</span>
												<i className="si si-user ml-1"></i>
											</a>
											<a className="dropdown-item d-flex align-items-center justify-content-between" href="/logout">
												<span>Log Out</span>
												<i className="si si-logout ml-1"></i>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</header>
					<Main />
				</div>
			</BrowserRouter>
		</Provider>
	);

	render(rootComponent, document.getElementById('root'));
});
