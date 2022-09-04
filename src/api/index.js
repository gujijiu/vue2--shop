import requests from './request';
import mockRequests from './mockAjax';

//  /api/product/getBaseCategoryList get 获取三级联动数据
export const reqCategoryList = ()=>requests({url: '/product/getBaseCategoryList',method: 'get'});

//获取轮播图数据
export const reqGetBannerList = ()=>mockRequests({url: '/banner',method: 'get'});

//获取floor组件数据
export const reqGetFloorList = ()=>mockRequests({url: '/floor',method: 'get'});

//获取搜素模块数据
export const reqPostSearchInfo = (data)=>requests({url: '/list',method: 'post',data});

//获取商品详情数据
export const reqGetGoodsInfo = (goodsId)=>requests({url: `/item/${goodsId}`,method: 'get'});

//产品加入购物车 或 更新购物车产品数量
export const reqPostAddOrUpdateShopCart = (goodsId,goodsNum)=>requests({url: `/cart/addToCart/${goodsId}/${goodsNum}`,method: 'post'});
