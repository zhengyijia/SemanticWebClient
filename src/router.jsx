import React, { Component } from 'react';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom'

import Header from './components/header'
import Login from './components/login'
import Home from './components/home'

class Routes extends Component {

	render() {
		return (
			<div>
				<Header/>
				<BrowserRouter basename='/semanticweb-client'>
					<div>
						<Switch>
							<Route path="/login" component={Login} />
							<Route path="/home" component={Home} />
							<Redirect from="*" to="/home"></Redirect>
						</Switch>
					</div>
				</BrowserRouter>
			</div>
		)
	}

}

export default Routes