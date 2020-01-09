import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Main from './components/Main';
import store from './store';

const rootComponent = (
	<Provider store={store}>
		<BrowserRouter>
			<div id="page-container" className="sidebar-o sidebar-dark enable-page-overlay side-scroll page-header-fixed side-trans-enabled">
				<Sidebar />
				<Header />
				<Main />
			</div>
		</BrowserRouter>
	</Provider>
);

render(rootComponent, document.getElementById('root'));
