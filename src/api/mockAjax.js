import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

const requests = axios.create({
    //补全链接
    baseURL:'/mock',
    //超时时间
    timeout: 5000,
})

requests.interceptors.request.use((config)=>{
    //config：配置对象，对象里面有一个属性很重要，header请求头
    nprogress.start();
    return config;
})

requests.interceptors.response.use((res)=>{
    //成功的回调函数，服务器相应数据过来后，拦截器可以检测到，并可以做一些事情
    nprogress.done();
    return res.data;
},(error)=>{
    return Promise.reject(new Error('faile'));
})



export default requests;