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

    //删除购物车所有选中的商品
    deleteAllCheckedCart({ getters,dispatch}){
        //filter（item=>{return item == 1}).forEach()也行
        let promiseAll = [];
        getters.CartInfo.cartInfoList.forEach(item => {
            // item.isChecked == 1 ? dispatch('deleteCartGoods',item.skuId) : '';
            if (item.isChecked == 1) {
                let promise = dispatch('deleteCartGoods', item.skuId);
                promiseAll.push(promise);
           }
        });
        return Promise.all(promiseAll);
    },

    async updateCartGoodsChecked({ state, commit, dispatch}, {goodsId,isChecked}){
        let result = await reqUpdateCartGoodsChecked(goodsId,isChecked);
        if(result.code === 200){
            return "ok";
        }else{
            return Promise.reject(new Error(result.message));
        }
    },

    updateAllCheckedCart({ state, dispatch }, isChecked){
        let promiseAll = [];
        state.shopCartInfo[0].cartInfoList.forEach(item => {
            if(item.isChecked != isChecked) {
                let promise = dispatch('updateCartGoodsChecked',{goodsId:item.skuId,isChecked});
                promiseAll.push(promise);
            }
        });
        //Promise.all():参数需要的是一个数组【数组里面需要promise】
        //Promise.all()执行一次,返回的是一个Promise对象,Promise对象状态：成功、失败取决于什么?
        //成功、还是失败取决于数组里面的promise状态:四个都成功、返回成功Promise、只要有一个失败、返回Promise失败状态！！！
        return Promise.all(promiseAll);
    },
};
//getters 理解为计算属性 用于简化仓库数据 让组件获取仓库的数据更加方便
const getters = {
    CartInfo(state) {
        return state.shopCartInfo[0] || {};
    },
//     CartInfoList(state) {
//         return state.shopCartInfo[0].cartInfoList || [];
//    },
};


//对外暴露
export default{
    namespaced:true,//命名空间
    state,
    mutations,
    actions,
    getters,
}