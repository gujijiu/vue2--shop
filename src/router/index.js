//路由配置
//引入
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);
//引入路由组件
//引入路由配置
import routes from './routes';
import store from '@/store';
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
let router = new VueRouter({
    //配置项
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 };
    }
});

//全局路由守卫
router.beforeEach(async (to,from,next)=>{
    //to:可以获取到要前往哪个路由
    //from:可以获取到从哪个路由来的 参数
    //next:放行的函数 
    //写法：全部放行：next();
    //放行到指定路由：next('指定路由');或者next({path:'指定路由'});
    //中断当前导航：next(false);
    //终止且错误传递给roter.onError()注册过的回调：next(error); 
    let name = store.state.user.userInfo.name;
    //可以选择引入仓库或者直接判断本地token，我选择后者
    if(localStorage.getItem("TOKEN")){
        // console.log(localStorage.getItem("TOKEN"));
        if(to.path === '/login' || to.path === '/register'){
            next('/home');
        }else{
            if(name){
                next();
            }else{
                try {
                    // console.log(1);
                    // let result = 
                    await store.dispatch('user/userInfo');
                    next();
                } catch (error) {
                    //token失效了
                    await store.dispatch('user/userLogout');
                    next('/login');
                }
            }
        }
    }else{
        // next();
        // console.log(to)
        let toPath = to.path;
        // const NoEntry = ['trade','pay','center'];
        if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
        // 未登录不可以去交易 支付相关以及个人中心
        // if(to.path){
            next('/login?redirect='+toPath);
        }else{
            next();
        }
    }
});

export default router;