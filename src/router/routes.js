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
        path:'*',
        redirect:'/home'
    }
]