import axios from 'axios';
import cookie from 'react-cookies';

axios.defaults.baseURL = 'http://localhost:8080/';

axios.interceptors.request.use(config => {
    let token = cookie.load('token');
    if (token !== null) {
    	config.header = {
    		...config.header, 
    		Authorization: token
    	}
    }
    return config;
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
	// 如果是token验证失败，跳转到登录页面
	if (error.response.status === 401) {
		// '000002'为后台返回对应errorCode
		if (error.response.data.errorCode === '000002') {
			window.location.href = './login';
		}
	}
    // return error.response.data;
    return Promise.reject(error);
});

export default axios;