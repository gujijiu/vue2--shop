<template>
    <div>
        <!-- <h1>Home</h1>123 -->
        <TypeNav />
        <ListContainer />
        <Recommend />
        <Rank />
        <Like />
        <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor" />
        <Brand />
    </div>
</template>

<script>
//引用页面其余组件
import ListContainer from '@/views/Home/ListContainer';
import Recommend from '@/views/Home/Recommend';
import Rank from '@/views/Home/Rank';
import Like from '@/views/Home/Like';
import Floor from '@/views/Home/Floor';
import Brand from '@/views/Home/Brand';
import {mapState} from 'vuex';
export default {
    name: 'Home',
    components:{
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand,
    },
    mounted(){
        this.$store.dispatch('home/getFloorList');
        // this.$store.dispatch('user/userInfo');
    },
    computed:{
        ...mapState({
            //这里对象右侧需要一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
            //注入一个参数state，其实即为大仓库中的数据
            floorList:state=>state.home.floorList
        })
    },
}
</script>

<style lang="less" scoped>

</style>