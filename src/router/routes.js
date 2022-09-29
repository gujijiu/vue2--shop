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
export default[
    {
        path: '/home',
        component: Home,
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
    },
    {
        path:'/pay',
        component: Pay,
        meta:{show: true},
    },
    {
        path:'/paySuccess',
        component: PaySuccess,
        meta:{show: true},
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