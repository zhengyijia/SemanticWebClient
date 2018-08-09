import './index.css';
import React, { Component } from 'react';
import axios from '../../utils/axios';
import cookie from 'react-cookies'

class Login extends Component {

    // 构造函数
    constructor(props) {
        super(props);

        this.state = {
            username: "admin", 
            password: "admin",
            login_info: ""
        }

        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
    }

    usernameChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    passwordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    onLoginClick() {
        let username = this.state.username; 
        let password = this.state.password; 
        
        this.setState({
            login_info: "登录中"
        });
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
            this.setState({
                login_info: "登录成功"
            });
            this.props.history.push('./home', null);
        }.bind(this))
        .catch(function (error) {
            console.log(error);
            this.setState({
                login_info: "登录失败"
            });
        }.bind(this));
    }

    render() {

        return (
            <div>
                admin/admin<br/>
                用户名：<input type="text" id="username" value={this.state.username} onChange={this.usernameChange} /><br/>
                密码：<input type="password" id="password" value={this.state.password} onChange={this.passwordChange} /><br/>
                <button onClick={this.onLoginClick}>登录</button><br/>
                <span>{this.state.login_info}</span>
            </div>
        )
    }
}

export default Login