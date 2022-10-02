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
//模拟数据
import '@/mock/mockServe';
//加载样式
import 'swiper/css/swiper.css';

// //测试请求
// import {reqCategoryList} from '@/api'
// reqCategoryList();
//将项目全部请求函数引入进来[分别暴露]
import  * as http from '@/api';

// 按需引入element-ui
import { MessageBox  } from 'element-ui';

import Gif from '@/assets/1.gif'
//图片懒加载
import VueLazyload from 'vue-lazyload';
//注册组件
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: errorimage,
  loading: Gif,
  attempt: 1
});

//引入表单校验插件
import "@/plugins/validate";

new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this;
    //通过Vue.prototype原型对象,将全部请求函数挂载到原型对象身上[VC:就可以使用请求函数]
    Vue.prototype.$http = http;
    // 开发时全部引入，完成测试前再全改为按需引入
    // Vue.component(Button.name, Button);//或者Vue.use(Button)
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  },
  //注册路由
  //注册router完毕时，组件身上也拥有了$router，$router属性
  router,
  //注册仓库 组件实例身上会多一个$store属性
  store,
}).$mount('#app')
