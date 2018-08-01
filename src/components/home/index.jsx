import './index.css';
import React, { Component } from 'react';
import cookie from 'react-cookies';

class Home extends Component {

	componentWillMount(){
        if (cookie.load('token') === undefined) {
            this.props.history.push('./login', null);
        }
    }

    render() {
        return (
            <div>
            	<p>主界面</p>
            </div>
        )
    }
}

export default Home