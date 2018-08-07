import axios from 'axios';
import cookie from 'react-cookies';
import conf from '../conf'

axios.defaults.baseURL = conf.baseURL;
axios.defaults.timeout = 5000

axios.interceptors.request.use(config => {
    let token = cookie.load('token');
    if (token !== undefined) {
        // config.headers.common.Authorization = token;
    	// config.headers.common = {
    	// 	...config.headers.common, 
    	// 	Authorization: token
    	// }
        config.headers.common['Authorization'] = token;
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