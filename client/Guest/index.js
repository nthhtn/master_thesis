import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import Main from './components/Main';
import store from './store';
import { getMyProfile } from './actions/User';
import { getCustomerDetails } from './actions/Customer';

store.dispatch(getMyProfile()).then(async () => {
	const { me } = store.getState().user;
	const { firstName, lastName, customerId } = me;
	await store.dispatch(getCustomerDetails(customerId));
	const rootComponent = (
		<Provider store={store}>
			<BrowserRouter>
				<header id="page-header">
					<div className="content-header">
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
										<Link className="dropdown-item d-flex align-items-center justify-content-between" to="/profile">
											<span>Profile</span>
											<i className="si si-user ml-1"></i>
										</Link>
										<a className="dropdown-item d-flex align-items-center justify-content-between" href="/logout">
											<span>Logout</span>
											<i className="si si-logout ml-1"></i>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>
				<Main />
			</BrowserRouter>
		</Provider>
	);
	render(rootComponent, document.getElementById('root'));
});
