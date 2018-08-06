import './index.css';
import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import axios from '../../utils/axios';
import cookie from 'react-cookies'

@inject(stores => ({
    store: stores.login
}))
@observer
class Login extends Component {

    // 构造函数
    constructor(props) {
        super(props);

        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
    }

    usernameChange(e) {
        this.props.store.setUsername(e.target.value);
    }

    passwordChange(e) {
        this.props.store.setPassword(e.target.value)
    }

    onLoginClick() {
        let { store } = this.props; 
        let username = store.username; 
        let password = store.password; 
        
        store.showLoginInfo("登录中");
        axios.post(
            'api/auth/login',
            {
                username: username,
                password: password
            }
        )
        .then(function (response) {
            cookie.save('token', response.data.token, { path: '/' });
            // window.localStorage.setItem("token", response.data.token);
            store.showLoginInfo("登录成功");
            this.props.history.push('./home', null);
        }.bind(this))
        .catch(function (error) {
            console.log(error);
            store.showLoginInfo("登录失败");
        });
    }

    render() {
        const { store } = this.props;

        return (
            <div>
                admin/admin<br/>
                用户名：<input type="text" id="username" value={store.username} onChange={this.usernameChange} /><br/>
                密码：<input type="password" id="password" value={store.password} onChange={this.passwordChange} /><br/>
                <button onClick={this.onLoginClick}>登录</button><br/>
                <span>{store.login_info}</span>
            </div>
        )
    }
}

export default Login