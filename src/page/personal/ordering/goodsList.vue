<template>
     <div  id="goods">

       <!--上面导航-->
       <div  class="redBtn">
         <ul>
           <li  @click="show(0)"    :class="activeIndex==0?'hover':''">待付款</li>
           <li  @click="show(1)"    :class="activeIndex==1?'hover':'  '  ">待收货</li>
           <li  @click="show(2)"    :class="activeIndex==2?'hover':''">退款/退货</li>
           <li  @click="show(3)"    :class="activeIndex==3?'hover':''">全部订单</li>
         </ul>
       </div>
       <hr>

<!--下面列表区-->
        <div  v-show="tabShow==1?true:false"  class="proList"    v-loading="loading"  element-loading-spinner="el-icon-loading">
                 <!--<div  v-for="(item,key)  in  proList"  :key="key"  >-->


                       <div class="shop"  v-for="(items,index)  in  proList"  :key="index">
                     <!--订单信息-->
                     <div class="goods-title" >
                       <p>订单号：<span class="rgcolor">{{items.orderNumber}}</span></p>
                       <p>订单状态：<span class="totalPrice">{{items.status}}</span></p>
                       <comBtn btnClass="fged2"  btnText="取消"  class="tbtn"   @click.native="back(items.id)"  v-if="activeIndex==0?true:false"></comBtn>
                     </div>

                     <!--产品列表-->
                     <div class="shopGoods"  v-for="(sitem,index)  in items. orderFormGoods">


                       <!--左边图片部分-->
                       <div class="shopLeft">
                         <img  :src="sitem.goodsUrl" alt="" width="100" height="80" style="border-radius: 10px">
                       </div>

                       <!--右边信息部分-->
                       <div class="shopRight">

                         <div>
                              <p  class="proname">{{sitem.goodsName}}</p>
                             <p class="thisPrice"  >￥{{sitem.unitPrice}}</p>
                           <div  style="margin-top: 0"  class="shopNum">
                             <span class="numtag">数量</span>
                             <el-input-number size="mini" v-model="sitem.amount" class="num"  :disabled="true"  style="width: 90px"></el-input-number>
                           </div>
                           <p class="totalPrice"  style="">￥{{sitem.totalPrice}}</p>
                         </div>
                         <comBtn btnClass="fged2"  btnText="申请退款"  class="tbtn"  v-show="isShow"></comBtn>
                       </div>

                     </div>
                   </div>
                 <!--</div>-->
        </div>




<!--分页-->
       <el-pagination
         v-show="tabShow==1?true:false"
         @current-change="handleCurrentChange"
         :current-page.sync="pageNum"
         :background=true
         :page-size="pageSize"
         style="position: absolute;bottom: 3%;left: 38%"
         layout="prev, pager, next,total"
         :total="total">
       </el-pagination>



       <!--没有数据-->
       <div  class="empty"     v-show="tabShow==2?true:false">
         <img src="../../../assets/empt.png" alt="">
       </div>

     </div>
</template>

<script>
export  default  require("./goodsCtr")
</script>

<style scoped>

  /*<!--没有数据-->*/
  .empty{

    margin:10.5%   0;
  }
#goods{
  min-height: 430px;
  position: relative;
  /*border: 1px solid red;*/
  padding-bottom: 10%;
}

  /*
  订单状态
   */

  .shopGoods {
    display: flex;
    width: 96%;
    margin-left: 3%;
    padding-bottom: 2%;
    justify-content: start;
    border-bottom: 1px dashed gainsboro;
  }


  .shopLeft {
    width: 16%;
    text-align: left;
    /*border: 1px solid red;*/
  }

  .shopRight {
    width:85%;
    line-height: 30px;
    margin-top: 7%;
    font-size: 14px;
    height: 30px;
  display: flex;
    justify-content: space-between;
    text-align: left;
    /*border: 1px solid black;*/
  }
  .shopRight>p{
    /*border: 1px solid red;*/
  }
  .shopRight .thisPrice,  .shopRight   .totalPrice{
    /*border: 1px solid red;*/
    width: 20%;
    text-align: left;
  }
  .shopNum{
    margin: 0  2%;
    /*border: 1px solid red;*/
  }
  /*.shopRight   .totalPrice{*/
    /*!*border: 1px solid red;*!*/
    /*width: 16%;*/
    /*text-align: left;*/
  /*}*/
  .shopRight>div:nth-of-type(1){
    display: flex;
    width:80%;
    margin: 0;
    padding: 0;
    /*border: 1px solid blue;*/
    justify-content: space-between;
  }

  .shopRight  .proname{
    width: 25%;
    /*border: 1px solid red;*/
  }
  .num {
    width: 110px;
  }

  .goods-title {
    width: 90%;
    display: flex;
    /*padding: 2%;*/
    font-size: 15px;
    padding-bottom: 0;
    margin-left: 3%;
    margin-top: 2%;
  /*border: 1px solid red;*/
    justify-content: space-between;
  }

  .goods-title p {
   text-align: left;
    width: 30%;
    /*border: 1px solid black;*/
  }

  .numtag {
    margin-right: 5px;
  }

  .rgcolor {
    color: rgb(59, 149, 44);
  }


hr{
  border: 1px solid gainsboro;
}



  /*红色导航*/
.redBtn{
  width:80%;
  text-align: left;
  border: 1px solid gainsboro;
  border-radius: 20px;
  font-size: 15px;
  margin:3% auto;
  overflow: hidden;
}
.redBtn ul{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.redBtn li{
  list-style: none;
  height: 100%;
  text-align: center;
  width: 30%;
  border-right: 1px solid red;
  padding: 0.6%  0;
  /*margin: 0;*/
}
.redBtn li:last-child{
  border:none;
}

.hover{
  color: white;
  background-color:red;
}

</style>
