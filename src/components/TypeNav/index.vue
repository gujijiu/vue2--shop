<template>
    <div class="type-nav">
        <div class="container">
            <!-- //事件委派。把子的事件委派给父元素 -->
            <div @mouseleave ="leaveShow()" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 过渡动画 -->
                <transition name="sort">
                    <!-- 三级联动 -->
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                    <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
                                </h3>
                                <!-- 二级、三级 -->
                                <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                    <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';
//这种引入是全部引入
import throttle from 'lodash/throttle';
export default {
    name: "TypeNav",
    data(){
        return{
            //存储用户鼠标移上哪一个一级分类
            currentIndex:   -1,
            show: true,
        }
    },
    //组件挂载完毕 可以向服务器发送请求
    mounted(){
        //如果不是home组件 隐藏
        // this.$route.name === 'home' ?  true : false;
        if(this.$route.path != '/home' ){
            this.show = false;
        }
    },
    computed:{
        ...mapState({
            //这里对象右侧需要一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
            //注入一个参数state，其实即为大仓库中的数据
            categoryList:state=>state.home.categoryList
        })
    },
    methods:{
        //鼠标进入事件
        // changeIndex(index){
        //     this.currentIndex = index;
        //     console.log(this.currentIndex)
        // },
        changeIndex:throttle(function(index){
            this.currentIndex = index;
            // console.log(this.currentIndex);
        },50),
        // leaveIndex(){
        //     this.currentIndex = -1;
        // },
        enterShow(){
            this.show = true;
        },
        leaveShow(){
            // this.show = false;
            this.changeIndex(-1);
            if(this.$route.path != '/home' ){
                this.show = false;
            }
        },
        goSearch(event){
            //确保点击的位置为A标签--方法一、使用event.target下的属性（可以获取到点击的标签）；
            //方法二、利用es5的自定义属性来判断点击的位置是否为A标签   (兼容性写法可以使用getAttribute() 方法来获取标签属性)
            let element = event.target;
            //节点（标签）有一个dataset属性，可以获取节点的自定义属性和属性值
            //使用 解构 来获取dataset下的属性
            let {categoryname,category1id,category2id,category3id} = element.dataset;
            //判断便签身上有categoryName自定义属性的一定是a标签
            if(categoryname){
                let location = {name:'search'};
                let query = {categoryName:categoryname};
                //判断三级a标签
                if(category1id){
                    query.category1Id = category1id;
                }else if(category2id){
                    query.category2Id = category2id;
                }else if(category3id){
                    query.category3Id = category3id;
                }
                location.query = query;
                //判断路由里面是否带有params参数，一并传递
                if(this.$route.params){
                    location.params = this.$route.params;
                }
                this.$router.push(location);
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;
                // overflow: hidden;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        &:hover {
                            .item-list {
                                display: block;
                            }
                        }
                    }
                    .cur{
                        background: skyblue;
                    }
                    // 通过样式动态添加背景
                    // .item:hover{
                    //     background: skyblue;
                    // }
                }
            }
            .sort-enter{
                height: 0px;
            }
            .sort-enter-to{
                height: 461px;
            }
            .sort-enter-active{
                transition: all .5s linear;
            }
        }
    }
</style>