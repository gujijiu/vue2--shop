import Vue from 'vue'
import App from './App.vue'
//注册三级联动全局组件
import TypeNav from '@/components/TypeNav';
Vue.component(TypeNav.name,TypeNav);
//注册轮播图全局组件
import Carousel from '@/components/Carousel';
Vue.component(Carousel.name,Carousel);
//注册分页器全局组件
import Pagination from '@/components/Pagination';
Vue.component(Pagination.name,Pagination);
//引入路由
import router from '@/router';
Vue.config.productionTip = false;
//引入仓库
import store from '@/store';

import '@/mock/mockServe';

import 'swiper/css/swiper.css';

// //测试请求
// import {reqCategoryList} from '@/api'
// reqCategoryList();

new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this;
  },
  //注册路由
  //注册router完毕时，组件身上也拥有了$router，$router属性
  router,
  //注册仓库 组件实例身上会多一个$store属性
  store,
}).$mount('#app')
