import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Main from './components/Main';
import store from './store';
import { getMyProfile } from './actions/User';
import { getCustomerDetails } from './actions/Customer';

store.dispatch(getMyProfile()).then(async () => {
	await store.dispatch(getCustomerDetails(store.getState().user.me.customerId));
	const rootComponent = (
		<Provider store={store}>
			<BrowserRouter>
				<Main />
			</BrowserRouter>
		</Provider>
	);
	render(rootComponent, document.getElementById('root'));
});
