import axios from 'axios';
import router from '../router';

// 请求拦截
axios.interceptors.request.use((config:any) => {
    // 携带token
    if(localStorage.token){
        config.headers.Authorization = localStorage.token
    }

    return config;
},(error) => {
    return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
    return response;
},(error) => {
    const {status} = error.response

    if(status === 401){
        localStorage.removeItem("token")

        router.push("/login")
    }
    return Promise.reject(error)
})

export default axios;