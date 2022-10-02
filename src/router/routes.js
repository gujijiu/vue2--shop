//路由配置信息
//引入路由组件
import Home from '@/views/Home';
import Search from '@/views/Search';
import Login from '@/views/Login';
import Register from '@/views/Register';
import Detail from '@/views/Detail';
import AddCartSuccess from '@/views/AddCartSuccess';
import ShopCart from '@/views/ShopCart';
import Trade from '@/views/Trade';
import Pay from '@/views/Pay';
import PaySuccess from '@/views/PaySuccess';
import Center from '@/views/Center';
// 引入二级路由组件
import MyOrder from '@/views/Center/myOrder';
import TeamOrder from '@/views/Center/teamOrder';
//5.0 默认路由懒加载吧  形式---》component: () => import("../views/Home/index.vue")
// const foo = ()=>{
//     return import("@/views/Home");
// };
/*
当打包构建应用时，JavaScript包会变得非常大，影响页面加载。
如果我们能把不同路由对应的阻件分害成不同的代码块，然后当路由被访问的时才加载对应组件，这样就更加高效了。
*/

export default[
    {
        path: '/home',
        component: ()=>import("@/views/Home"),
        meta:{show: true}
    },
    {
        path:'/search/:keyword?',
        component: Search,
        meta:{show: true},
        name:"search",
        // props: true
        // props: {a:1,b:2}
        props:($router)=>({keyword:$router.params.keyword}),
    },
    {
        path:'/login',
        component: Login,
        meta:{show: false}
    },
    {
        path:'/register',
        component: Register,
        meta:{show: false}
    },
    {
        path:'/detail/:goodsId',
        component: Detail,
        meta:{show: true},
        // props:($router)=>({goodsId:$router.params.goodsId}),
    },
    {
        path:'/addcartsuccess',
        component: AddCartSuccess,
        meta:{show: true},
    },
    {
        path:'/shopcart',
        component: ShopCart,
        meta:{show: true},
    },
    {
        path:'/trade',
        component: Trade,
        meta:{show: true},
        beforeEnter:(to,from,next)=>{
            if(from.path == "/shopcart"){
                next();
            }else{
                next(false);
            }
        },
    },
    {
        path:'/pay',
        component: Pay,
        meta:{show: true},
        beforeEnter:(to,from,next)=>{
            if(from.path == "/trade"){
                next();
            }else{
                next(false);
            }
        },
    },
    {
        path:'/paySuccess',
        component: PaySuccess,
        meta:{show: true},
        beforeEnter:(to,from,next)=>{
            if(from.path == "/pay"){
                next();
            }else{
                next(false);
            }
        },
    },
    {
        path:'/center',
        component: Center,
        meta:{show: true},
        //二级路由组件
        children:[
            {
                path:'myorder',
                component: MyOrder,
            },
            {
                path:'teamorder',
                component: TeamOrder,
            }
        ]
    },
    {
        path:'/',
        redirect:'/home'
    }
]