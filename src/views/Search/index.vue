<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName()">×</i></li>
            <!-- 关健词面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword()">×</i></li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="removeTradeMark(index)">×</i></li>
            <!-- 售卖属性面包屑 -->
            <li class="with-x" v-for="(props,index) in searchParams.props" :key="index">{{props.split(":")[1]}}<i @click="removeProps()">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @getTradeMarkInfo="getTradeMarkInfo" @getAttrInfo="getAttrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="sort(1)">
                  <a href="#" style="font-size:15px;">综合
                  <span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-up': isDesc, 'icon-down': isAsc }"
                      style="line-height:20px;"
                    ></span></a>
                </li>
                <li :class="{ active: isTwo }" @click="sort(2)">
                  <a href="#" style="font-size:15px;">
                  <span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-up': isDesc, 'icon-down': isAsc }"
                      style="line-height:20px;"
                    ></span>价格</a>
                </li>
                <!-- <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li> -->
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods,index) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`"><img :src="goods.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i> {{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="`/detail/${goods.id}`">{{goods.title}}</router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- <Pagination style="text-align:center;" :pageNo="searchInfo.pageNo" :pageSize="searchParams.pageSize" :total="searchInfo.total" :totalPages="searchInfo.totalPages" :continues="5" @currentPage="currentPage"></Pagination> -->
          <Pagination style="text-align:center;" :pageNo="searchInfo.pageNo" :pageSize="searchParams.pageSize" :total="searchInfo.total" :continues="5" @currentPage="currentPage"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import {mapState,mapGetters} from 'vuex';
  export default {
    //组件名称
    name: 'Search',
    //数据
    data(){
      return {
        searchParams: {
          "category1Id": "",
          "category2Id": "",
          "category3Id": "",
          "categoryName": "",
          "keyword": "",
          "order": "1:desc",
          "pageNo": 1,
          "pageSize": 10,
          "props": [],
          "trademark": ""
        }
      };
    },
    //子组件组成
    components: {
      SearchSelector
    },
    //组件挂载之前执行一次
    beforeMount(){
      //复杂的写法
      // this.searchParams.category1Id = this.$route.category1Id;
      //简单写法 使用es6中Object.assign()合并数据 【补充：也可以使用es6解构赋值】
      Object.assign(this.searchParams,this.$route.query,this.$route.params);
    },
    //组件挂载完成，只执行一次
    mounted(){
      this.getData();
    },
    //计算属性
    computed:{
      ...mapGetters({
        //这里对象右侧需要一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
        //注入一个参数state，其实即为大仓库中的数据
        goodsList: 'search/goodsList'
        // searchInfo:state=>state.search.searchInfo;
      }),
      ...mapState({
        searchInfo:state=>state.search.searchInfo
      }),
      isOne(){
        return this.searchParams.order.indexOf('1') != -1
      },
      isTwo(){
        return this.searchParams.order.indexOf('2') != -1
      },
      isAsc(){
        return this.searchParams.order.indexOf("asc") != -1;
      },
      isDesc(){
        return this.searchParams.order.indexOf("desc") != -1;
      }
    },
    //函数存放
    methods: {
      getData(){
        this.$store.dispatch('search/postSearchInfo',this.searchParams);
        this.searchParams.category1Id = this.searchParams.category2Id = this.searchParams.category3Id = undefined;
      },
      removeCategoryName(){
        this.searchParams.categoryName = this.searchParams.category1Id = this.searchParams.category2Id = this.searchParams.category3Id = undefined;
        // this.getData();
        // if(this.$router.params){
        //   this.$router.push({name: "search",params: this.$router.params});
        // }
        this.$router.push({name: "search",params: this.$route.params});
      },
      removeKeyword(){
        this.searchParams.keyword = undefined;
        // this.getData();
        // if(this.$router.params){
        //   this.$router.push({name: "search",params: this.$router.params});
        // }
        this.$router.push({name: "search",query: this.$route.query});
        this.$bus.$emit("clearKeyword");
      },
      removeTradeMark(){
        this.searchParams.trademark = undefined;
        this.getData();
      },
      removeProps(index){
        this.searchParams.props.splice(index,1);
        this.getData();
      },
      getTradeMarkInfo(trademark){
        // console.log(trademark);
        this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
        this.getData();
      },
      getAttrInfo(attrs,attrValue){
        let props = `${attrs.attrId}:${attrValue}:${attrs.attrName}`;
        // 判断数组内是否存在
        if(this.searchParams.props.indexOf(props) == -1){
          this.searchParams.props.push(props);
          this.getData();
        }
        //数组去重
        // this.searchParams.props = Array.from(new Set(this.searchParams.props));
      },
      sort(orderType){
        // let originOrder = this.searchParams.order;
        // let originType = this.searchParams.order.split(':')[0];
        this.searchParams.order==`${orderType}:desc`?(this.searchParams.order=`${orderType}:asc`):(this.searchParams.order=`${orderType}:desc`);
        this.getData();
        // this.isOne?this.isAsc?'1:desc':'1:asc':'1:desc':!this.isOne?this.isAsc?'2:desc':'2:asc':'2:desc';
      },
      currentPage(page){
        this.searchParams.pageNo = page;
        this.getData();
      }
    },
    //触发器
    watch: {
      //监听属性
      $route(newValue,oldValue){
        //整理新数据
        Object.assign(this.searchParams,this.$route.query,this.$route.params);
        //获取新的数据
        this.getData(); 
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

      }
    }
  }
</style>