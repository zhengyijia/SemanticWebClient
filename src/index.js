import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './router';
import { Provider } from 'mobx-react'
import stores from './stores'
ReactDOM.render(
	<Provider {...stores}>
		<App />
	</Provider>, 
	document.getElementById('root')
);
