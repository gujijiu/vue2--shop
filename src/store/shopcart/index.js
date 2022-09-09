//home 小仓库
import { reqGetCartList,reqDeleteCartById,reqUpdateCartGoodsChecked } from '@/api';

//state 仓库存储数据的地方
const state ={
    // 根据接口返回值进行初始化
    shopCartInfo: [],
};
//mutations 修改state的唯一手段
const mutations = {
    CARTLIST(state,shopCartInfo){
        // console.log(categoryList);
        state.shopCartInfo = shopCartInfo;
    },
};
//action 处理action 可以书写自己的业务逻辑 也可以处理异步
const actions = {
    //通过api里面的接口函数调用 向服务器发送请求 获取服务器的数据
    async cartList({ state, commit, dispatch }){
        let result = await reqGetCartList();
        if(result.code === 200){
            // console.log(result.data);
            commit("CARTLIST",result.data);
        }
    },

    async deleteCartGoods({ state, commit, dispatch}, goodsId){
        let result = await reqDeleteCartById(goodsId);
        if(result.code === 200){
            return "ok";
        }else{
            return Promise.reject(new Error(result.message));
        }
    },

    async updateCartGoodsChecked({ state, commit, dispatch}, {goodsId,isChecked}){
        let result = await reqUpdateCartGoodsChecked(goodsId,isChecked);
        if(result.code === 200){
            return "ok";
        }else{
            return Promise.reject(new Error(result.message));
        }
    },
};
//getters 理解为计算属性 用于简化仓库数据 让组件获取仓库的数据更加方便
const getters = {
    CartInfo(state) {
        return state.shopCartInfo[0] || {};
   },
};


//对外暴露
export default{
    namespaced:true,//命名空间
    state,
    mutations,
    actions,
    getters,
}