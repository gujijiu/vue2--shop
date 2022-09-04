//search 小仓库
import {reqPostSearchInfo} from '@/api';

//state 仓库存储数据的地方
const state ={
    searchInfo:{},
};
//mutations 修改state的唯一手段
const mutations = {
    POSTSEARCHINFO(state,searchInfo){
        state.searchInfo = searchInfo;
    },
};
//action 处理action 可以书写自己的业务逻辑 也可以处理异步
const actions ={
    async postSearchInfo({commit},params){
        // console.log(params);
        //reqPostSearchInfo 最起码要传递过去一个空对象
        //params形参：当用户派发action的时候，第二个参数传递过来的，至少是个空对象
        let result = await reqPostSearchInfo(params);
        if(result.code === 200){
            // console.log(params);
            commit("POSTSEARCHINFO",result.data);
        }
    },
};
//getters 理解为计算属性 企业中主要用于简化仓库数据 让组件获取仓库的数据更加方便
//可以把组件中将要使用的数据建华区处理 【将来组件在获取数据的时候更为方便】
const getters ={
    //当前第一个形参的state是当前仓库的state·，并非大仓库中的state
    goodsList(state){
        //这样书写是有问题的 如果请求失败或者返回数据为空则searchInfo对象下没有goodsList数据
        return state.searchInfo.goodsList||[];
    },
    trademarkList(state){
        return state.searchInfo.trademarkList||[];
    },
    attrsList(state){
        return state.searchInfo.attrsList||[];
    },
};


//对外暴露
export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters,
}