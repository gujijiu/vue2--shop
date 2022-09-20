//home 小仓库
import { reqGetCode,reqUserRegister,reqUserLogin,reqGetUserInfo,reqUserLogout } from '@/api';

//state 仓库存储数据的地方
const state ={
    // 根据接口返回值进行初始化
    code:'',
    userInfo:{},
    token:localStorage.getItem("TOKEN"),
};
//mutations 修改state的唯一手段
const mutations = {
    GETCODE(state,code){
        // console.log(categoryList);
        state.code = code;
    },
    SET_TOKEN(state, token) {
        state.token = token;
    }, 
    // USERLOGIN(state,userInfo){
    //     state.userInfo = userInfo;
    // },
    USERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    CLEAR(state) {
        //清除仓库相关用户信息
        state.token = '';
        state.nickName = '';
        //本地存储令牌清空
        localStorage.removeItem('TOKEN');
   }
};
//action 处理action 可以书写自己的业务逻辑 也可以处理异步
const actions = {
    //通过api里面的接口函数调用 向服务器发送请求 获取服务器的数据
    async getCode({ state, commit, dispatch },phone){
        let result = await reqGetCode(phone);
        if(result.code === 200){
            // console.log(result.data);
            commit("GETCODE",result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },

    async userRegister({ state, commit, dispatch}, userData){
        let result = await reqUserRegister(userData);
        if(result.code === 200){
            return "ok";
        }else{
            return Promise.reject(new Error(result.message));
        }
    },

    async userLogin({ state, commit, dispatch}, userData){
        let result = await reqUserLogin(userData);
        if(result.code === 200){
            // commit("USERLOGIN",result.data);
            commit("SET_TOKEN",result.data.token);
            //以后开发的时候:经常的登录的成功获取token【持久化存储】
            localStorage.setItem('TOKEN', result.data.token);
            return "ok";
        }else{
            return Promise.reject(new Error(result.message));
        }
    },

    async userLogout({ state, commit, dispatch}){
        let result = await reqUserLogout();
        if(result.code === 200){
            commit("CLEAR");
            return "ok";
        }else{
            return Promise.reject(new Error(result.message));
        }
    },

    async userInfo({ state, commit, dispatch}){
        let result = await reqGetUserInfo();
        if(result.code === 200){
            commit('USERINFO',result.data);
            return "ok";
        }else{
            return Promise.reject(new Error(result.message));
        }
    }
};
//getters 理解为计算属性 用于简化仓库数据 让组件获取仓库的数据更加方便
const getters = {
};


//对外暴露
export default{
    namespaced:true,//命名空间
    state,
    mutations,
    actions,
    getters,
}