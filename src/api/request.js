import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
//获取仓库:存储数据
import store from "@/store";

const requests = axios.create({
    //补全链接
    baseURL:'/api',
    //超时时间
    timeout: 5000,
})

requests.interceptors.request.use((config)=>{
    //config：配置对象，对象里面有一个属性很重要，header请求头
    if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token;
        // console.log(config.headers.userTempId);
    }
    //判断token是否存在
    if(localStorage.getItem("TOKEN")){
        config.headers.token = localStorage.getItem("TOKEN");
    }
    // console.log(config.headers);
    nprogress.start();
    return config;
})

requests.interceptors.response.use((res)=>{
    // console.log(123);
    //成功的回调函数，服务器相应数据过来后，拦截器可以检测到，并可以做一些事情
    nprogress.done();
    return res.data;
},(error)=>{
    // console.log(123);
    return Promise.reject(new Error('faile'));
})


export default requests;