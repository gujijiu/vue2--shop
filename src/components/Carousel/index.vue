<template>
    <div class="swiper-container" ref="mySwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel,index) in carouselList" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper';
export default {
    name: 'Carousel',
    props: ['carouselList'],
    //监听数据
    watch:{
        carouselList:{
            immediate: true,//立即监听执行一次
            //bannerList从空数组变成四个图片的数组
            handler(newValue,oldValue){
                //v-for执行完毕才能更改dom，现在还不能确定v-for是否执行完毕
                // 组件实例的$nextTick方法，在工作当中经常使用，经常结合第三方插件使用，获取更新后的DOM节点
                this.$nextTick(()=>{
                    //当执行这个回调函数时意味着服务器数据回来了且v-for执行完毕了【轮播图结果也有了】
                    let mySwiper = new Swiper (this.$refs.mySwiper, {
                        // direction: 'vertical', // 垂直切换选项
                        loop: true, // 循环模式选项
                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                            // 点击小球也切换
                            clickable: true,
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }, 
                        // 如果需要滚动条
                        scrollbar: {
                            el: '.swiper-scrollbar',
                        },
                    });
                });
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>