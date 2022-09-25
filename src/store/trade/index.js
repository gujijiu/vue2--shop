//home 小仓库
import { reqGetUserAddressInfo,reqGeOrderInfo } from '@/api';

//state 仓库存储数据的地方
const state ={
    // 根据接口返回值进行初始化

};
//mutations 修改state的唯一手段
const mutations = {
    GETUSERADDRESS(state,address){
        state.address = address;
    },
    GETPRDERINFO(state,order){
        state.order = order;
    },
};
//action 处理action 可以书写自己的业务逻辑 也可以处理异步
const actions = {
    async getUserAddres({commit}){
        let result = await reqGetUserAddressInfo();
        if(result.code === 200){
            commit('GETUSERADDRESS',result.data);
        }else{
            return Promise.reject(new Error(result.message));
        }
    },
    async getOrderInfo({commit}){
        let result = await reqGeOrderInfo();
        if(result.code === 200){
            commit('GETPRDERINFO',result.data);
        }else{
            return Promise.reject(new Error(result.message));
        }
    },
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