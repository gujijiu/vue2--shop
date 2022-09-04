<template>
  <div id="app">
    <Header></Header>
    <!-- 路由出口 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入
import Header from './components/Header'
import Footer from './components/Footer';
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
    //通知Vuex发送请求，获取数据 将返回数据存储到仓库里面
    //app组件最先执行且mounted只执行一次，这样可以避免三级组件重复请求获取（优化项目性能，减少服务器压力）
    this.$store.dispatch('home/categoryList','categoryList');
  }
}
</script>

<style>

</style>
