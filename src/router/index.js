//路由配置
//引入
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);
//引入路由组件

//引入路由配置
import routes from './routes';
//修复push raplace报错
//备份push originRaplace
let originPush = VueRouter.prototype.push;
let originRaplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(location,resolve,reject) {
    if(resolve || reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}

VueRouter.prototype.replace = function(location,resolve,reject) {
    if(resolve || reject){
        originRaplace.call(this,location,resolve,reject);
    }else{
        originRaplace.call(this,location,()=>{},()=>{});
    }
}
//配置路由
export default new VueRouter({
    //配置项
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 };
    }
})