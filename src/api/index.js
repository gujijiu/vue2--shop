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

//获取购物车数据
export const reqGetCartList=()=>requests({url: '/cart/cartList',method: 'get'});

//删除购物车商品
export const reqDeleteCartById=(goodsId)=>requests({url: `/cart/deleteCart/${goodsId}`,method: 'delete'});

//修改购物车商品选中状态
export const reqUpdateCartGoodsChecked=(goodsId,isChecked)=>requests({url: `/cart/checkCart/${goodsId}/${isChecked}`,method: 'get'});

//注册验证码获取
export const reqGetCode=(phone)=>requests({url: `/user/passport/sendCode/${phone}`,method: 'get'});

//用户注册
export const reqUserRegister=(data)=>requests({url: `/user/passport/register`,method: 'post',data});

//用户登录
export const reqUserLogin=(data)=>requests({url: `/user/passport/login`,method: 'post',data});

//用户退出登录
export const reqUserLogout=()=>requests({url: `/user/passport/logout`,method: 'get'});

//获取用户信息
export const reqGetUserInfo=()=>requests({url: '/user/passport/auth/getUserInfo',method: 'get'});

//获取用户收货地址信息
export const reqGetUserAddressInfo=()=>requests({url: '/user/userAddress/auth/findUserAddressList',method: 'get'});

//获取用户商品清单
export const reqGeOrderInfo=()=>requests({url: '/order/auth/trade',method: 'get'});