import { LOGIN } from './actionTypes'
import axios from '../utils/axios';
import cookie from 'react-cookies';

// 请求开始
const loginRequest = () => {
	return {
		type: LOGIN, 
		status: 'waiting'
	};
}

// 请求成功
const loginSuccess = () => {
	return {
		type: LOGIN, 
		status: 'success'
	};
}

// 请求失败
const loginFailure = () => {
	return {
		type: LOGIN, 
		status: 'failure'
	}
}

// 跳转到首页
const toHome = () => {
	window.location.href = './home';
}

const loginAction = (username, password) => {
    
    return (dispatch) => {
    	dispatch(loginRequest());

    	axios.post(
    		'api/auth/login',
    		{
    			username: username,
    			password: password
  			}
  		)
  		.then(function (response) {
    		console.log(response);
    		cookie.save('token', response.data.token, { path: '/' });
    		console.log("token: " + cookie.load('token'));
    		// window.localStorage.setItem("token", response.data.token);
    		// console.log("token: " + window.localStorage["token"]);
    		dispatch(loginSuccess());
    		toHome();
  		})
  		.catch(function (error) {
    		console.log(error);
    		dispatch(loginFailure());
  		});
    }
}

export default loginAction