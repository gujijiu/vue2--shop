<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cartInfo,index) in cartInfoList" :key="cartInfo.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cartInfo.isChecked==1" @click="cartInfo.isChecked=!cartInfo.isChecked">
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{cartInfo.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cartInfo.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a @click="cartInfo.skuNum>0 ?cartInfo.skuNum--:cartInfo.skuNum==0" class="mins">-</a>
            <input autocomplete="off" type="text" v-model="cartInfo.skuNum" minnum="1" class="itxt">
            <a @click="cartInfo.skuNum++" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartInfo.skuNum * cartInfo.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked && cartInfoList.length>0">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'ShopCart',
    //生命钩子 组件挂载完毕
    mounted(){
      this.getData();
    },
    //函数
    methods:{
      getData(){
        this.$store.dispatch('shopcart/cartList');
      }
    },
    computed:{
      ...mapGetters({
        cartList: 'shopcart/CartInfo'
      }),
      cartInfoList(){
        return this.cartList.cartInfoList || [];
      },
      totalPrice(){
        // let sum = 0;
        //解决this.cartInfoList可能在数据没回来的时候是个空数组 并且通过try catch 异步的特性捕获异常并保证代码正常运行
        try {
          //数组的filter方法可以筛选出符合的数据 reduce方法可以实现数组内元素之间的计算 （二者都首先具备遍历数组的功能）
          return this.cartInfoList.filter((item)=>{
            return item.isChecked == 1;
          }).reduce((oldValue,value)=>{
            return oldValue + value.skuPrice*value.skuNum;
          },0);
          
          // let cartCheckedList = this.cartInfoList.filter((item)=>{
          //   return item.isChecked == 1;
          // });
          // if(cartCheckedList.lenth != 1 && cartCheckedList.length > 0){
          //   //console.log(cartCheckedList.length);
          //   sum = cartCheckedList.reduce((oldValue,value)=>{
          //     //console.log(oldValue,value);
          //     return oldValue.skuNum*oldValue.skuPrice + value.skuPrice*value.skuNum;
          //   });
          // }else{
          //   console.log(cartCheckedList.length);
          //   sum = cartCheckedList[0].skuNum*cartCheckedList[0].skuPrice;
          // }

          // return this.cartInfoList.filter((item)=>{
          //   return item.isChecked == 1;
          // }).reduce((oldValue,value)=>{
          //   console.log(oldValue,value);
          //   return oldValue.skuNum*oldValue.skuPrice + value.skuPrice*value.skuNum;
          // },0);
        }catch(e){
          return 0;
        };
        return 0;
      },
      isAllChecked(){
        //every 1，首先具备遍历元素 2，判断数组内元素是否全部满足条件
        return this.cartInfoList.every(item=>{
          return item.isChecked == 1;
        }) 
      },
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>