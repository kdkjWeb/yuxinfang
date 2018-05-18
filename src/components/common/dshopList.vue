<template>
  <div class="shop">
    <!--订单信息-->
    <div class="goods-title">
      <p>订单号：<span class="rgcolor">{{goodsId}}</span></p>
      <p>订单状态：<span class="totalPrice">{{goodsStatus}}</span></p>
    </div>

    <!--产品列表-->
    <div class="shopGoods">


      <!--左边图片部分-->
      <div class="shopLeft">
        <img  :src="imgsrc" alt="" width="120" height="100" style="border-radius: 10px">
      </div>

      <!--右边信息部分-->
      <div class="shopRight">
          <p  style="width: 20%">{{title}}</p>
          <p class="thisPrice"  style="width: 10%">￥{{price}}</p>
          <div  style="width: 30%">
                 <span class="numtag">数量</span>
                   <el-input-number size="mini" v-model="num7" class="num"  :disabled="true"></el-input-number>
          </div>
          <p class="totalPrice"  style="width: 10%">￥{{oldPrice}}</p>
          <slot name="btn"></slot>
      </div>

    </div>
  </div>
</template>

<script>
  import comBtn from '../common/btn'

  export default {
    name: "dshopList",
    components: {
      comBtn
    },
    data() {
      return {
        num7: 1
      }
    },
    props:["goodsId","goodsStatus","imgsrc","title","price","oldPrice"]
  }
</script>

<style scoped>
  .shopGoods {
    display: flex;
    padding: 2%;
    width: 96%;
    justify-content: start;
    border-bottom: 1px dashed gainsboro;
  }


  .shopLeft {
    width: 20%;
    /*border: 1px solid red;*/
  }

  .shopRight {
    width: 80%;
    display: flex;
    line-height: 30px;
    margin-top: 2%;
    font-size: 14px;
    text-align: left;
    justify-content: space-between;
    /*border: 1px solid black;*/
  }

  .num {
    width: 120px;
  }

  .goods-title {
    width: 50%;
    display: flex;
    padding: 2%;
    font-size: 15px;
    padding-bottom: 0;

    justify-content: space-between;
  }

  .goods-title p {

    width: 50%;
  }

  .numtag {
    margin-right: 5px;
  }

  .rgcolor {
    color: rgb(59, 149, 44);
  }



  .totalPrice {
    color: red;
    margin: 0 2%;
  }

  .thisPrice {
    color: rgb(253, 136, 0);
    margin: 0 2%;
  }

  .rightPrice {
    /*margin-bottom: 10px;*/

  }


</style>
