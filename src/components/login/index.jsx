import './index.css';
import React, { Component } from 'react';
import { observer } from "mobx-react";

@observer
class Login extends Component {

    render() {
        return (
            <div>
                admin/admin<br/>
                用户名：<input type="text" id="username" /><br/>
                密码：<input type="password" id="password" /><br/>
                <button>登录</button><br/>
                <span></span>
            </div>
        )
    }
}

export default Login