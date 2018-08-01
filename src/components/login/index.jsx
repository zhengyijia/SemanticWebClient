import './index.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'; 
import loginAction from '../../actions/login'

class Login extends Component {

    // 构造函数
    constructor(props) {
        super(props); 
        this.state = {
            username: 'admin', 
            password: 'admin'
        }
    }

    // 约束性组件username监听事件
    usernameChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    // 约束性组件password监听事件
    passwordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    onLoginClick() {
        let username = this.state.username
        let password = this.state.password
        this.props.onLoginClick(username, password)
    }

    render() {

        return (
            <div>
                <span>{this.props.info}</span>
                admin/admin<br/>
                用户名：<input type="text" id="username" value={this.state.username} onChange={this.usernameChange.bind(this)} /><br/>
                密码：<input type="password" id="password" value={this.state.password} onChange={this.passwordChange.bind(this)} /><br/>
                <button onClick={this.onLoginClick.bind(this)}>登录</button>
            </div>
        )
    }
}

// 传入属性类型校验
Login.propTypes = {
    info: PropTypes.string.isRequired, 
    onLoginClick: PropTypes.func.isRequired
}

// Map Redux state to component props
function mapStateToProps(state) {
    let info = ""
    if (state.login.status === 'waiting') {
        info = "登录中"
    } else if (state.login.status === "success") {
        info = "登录成功"
    } else if (state.login.status === "failure") {
        info = "登录失败"
    }
    return {
        info: info
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        onLoginClick: (username, password) => {
            dispatch(loginAction(username, password))
        }
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Login)