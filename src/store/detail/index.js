//home 小仓库
import { reqGetGoodsInfo,reqPostAddOrUpdateShopCart } from '@/api';
//生成一个随机id
import {getUUID} from '@/utils/uuid_token';

//state 仓库存储数据的地方
const state ={
    // 根据接口返回值进行初始化
    detailInfo: {},
    uuid_token:getUUID()
};
//mutations 修改state的唯一手段
const mutations = {
    GOODSINFO(state,detailInfo){
        // console.log(categoryList);
        state.detailInfo = detailInfo;
    },
};
//action 处理action 可以书写自己的业务逻辑 也可以处理异步
const actions = {
    //通过api里面的接口函数调用 向服务器发送请求 获取服务器的数据
    async goodsInfo({ state, commit, dispatch }, goodsId){
        let result = await reqGetGoodsInfo(goodsId);
        if(result.code === 200){
            // console.log(result.data);
            commit("GOODSINFO",result.data);
        }
    },
    //产品加入购物车
    async addOrUpdateShouCart({ state, commit, dispatch }, {goodsId,goodsNum}){
        let result = await reqPostAddOrUpdateShopCart(goodsId,goodsNum);
        if(result.code === 200){
            return "ok";
        }else{
            return Promise.reject(new Error(result.message));
        }
    }
};
//getters 理解为计算属性 用于简化仓库数据 让组件获取仓库的数据更加方便
const getters = {
    //面包屑的数据
    categoryView(state) {
        //研究这个问题:
        //起始状态:state.detailInfo起始状态空对象,空对象.categoryView->undefined
        //当服务器数据回来之后state.detailInfo,并非空对象,获取的即为服务器返回的数据{7个K}
        //当前属性值:服务器的数据有值，用服务器的。服务器数据没有回来至少有一个空对象兜底【不能undefined兜底】
        return state.detailInfo.categoryView || {}
   },
   //商品信息的数据
   goodsInfo() {
        return state.detailInfo.skuInfo || {}
   },
   //商品销售属性列表的数据
   spuSaleAttrList() {
        return state.detailInfo.spuSaleAttrList || []
   }
};


//对外暴露
export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters,
}