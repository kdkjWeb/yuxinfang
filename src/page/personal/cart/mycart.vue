
<template>
  <div id="bigBox">

    <!--===============================购物车首页=============================-->
    <div class="tab1" v-if="index">

      <!--购物车列表-->
      <div class="shopC"   v-loading="loading"  element-loading-spinner="el-icon-loading">

        <!--&lt;!&ndash;循环店家，有几个店家的订单&ndash;&gt;-->
        <div v-for="(item,key) in carList" :key="key" class="shopBox"   >

          <!--循环店家里面的商品有几个-->
          <div v-for="(items,index) in item" :key="index">

            <!--每个店家订单上面的信息和优惠券显示-->
            <div class="shopCtitle">

              <!--店名字-->
              <p v-if="index==0">
                  {{items.shopMsg.shopName}}<i class="el-icon-arrow-right"></i>
              </p>

              <p class="yhtitle" @click="clickS(items.id,items.shopMsg.id)" v-if="index==0">优惠券</p>

              <!--优惠券显示-->
              <div class="yhcontent" v-show="yshow==items.id?true:false">
                <div class="yhBox-content" v-for="i  in  yhlist" :key="i.id">
                  <div class="left">
                    <p class="totalPrice">￥{{i.amount}}</p>
                    <p>满{{i.couponCondition}}元减{{i.amount}}</p>
                    <small>有效时间：{{i.beginTime.substring(0,11)}}到 {{i.stopTime.substring(0,11)}}</small>
                  </div>
                  <comBtn btnClass="noborder" btnText="领取" @click.native="getyh(i.id)"
                          v-if="i.status==0? true:false"></comBtn>
                  <comBtn btnClass="bigBtn2" btnText="已领"  v-if="i.status==1? true:false"></comBtn>
                </div>
              </div>
            </div>

            <!--商品显示区-->
            <div class="proBox" :class="index!=0?'top':''">

              <!--单选框-->
              <div class="shopCheckC">
                <el-checkbox class="cheak" v-model="items.goodsMsg.checked"
                             @change="checkChange(items.id)"></el-checkbox>
              </div>

              <!--产品列表-->
              <div class="shopGoodsC">

                <!--产品图片左边-->
                <div class="shopLeft">
                  <img :src="items.goodsMsg.imgUrl" alt="" width="100%" height="100" style="border-radius: 10px">
                </div>

                <!--产品右边价格等信息-->
                <div class="shopRight">

                  <!--产品名字-->
                  <p>{{ items.goodsMsg.goodsTitle }}</p>


                  <div class="rightPrice">
                    <!--产品价格-->
                    <p class="thisPriceC">￥{{items. goodsMsg.realPrice }}</p>

                    <!--产品数量-->
                    <div>
                      <span style="margin-right: 7px">数量</span>
                      <el-input-number size="mini" v-model="items.amount" :min="1"
                                       @change="getnum(items)"  style="width: 100px"></el-input-number>
                    </div>

                    <!--删除-->

                    <!--商品总价，随着数量改变 -->
                    <p class="totalPrice" v-model="items.totalP">￥{{items.totalP }}</p>
                    <comBtn btnClass="fged" btnText="删除" @clicked="dele(items.id)"></comBtn>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>

        <!--下面总价和总数量-->
        <div class="totalNum" id="btotalNum"   v-if="index">
          <div style="margin-left: 2%">
            <el-checkbox  v-model="checked" @change="allCheck">全选</el-checkbox>
          </div>

          <div>
            <span class="totalPrice">总价 <span>￥{{totalPrice}}</span></span>
            <comBtn btnClass="send" btnText="去结算" @clicked="open2"></comBtn>
          </div>
        </div>

      </div>


    </div>


    <!--===================================点击结算，跳至结算页======================-->
    <div class="tab2" v-if="dindex">
      <div class="tabTop">
        <p class="totalPrice  tabtitle">金币金额：800000</p>
        <comBtn btnClass="fged" btnText="返回" @click.native="backAdr" class="backgo"></comBtn>
      </div>


      <!--收货地址-->
      <div class="address">
        <p class="address-title">收货人信息</p>
        <div class="address-text">
          <p>
            <span>姓名：</span> <input type="text" placeholder="请输入姓名" v-model="adrName">
            <span class="phone">电话：</span> <input type="text" placeholder="请输入电话" v-model="adrPhone">
          </p>
          <p>
            <span>地址：</span> <input type="text" placeholder="请输入收货地址" class="long" v-model="adress">
          </p>
          <comBtn btnClass="fged" btnText="保存" class="save" @click.native="saveAdr"></comBtn>
        </div>
      </div>


      <!--产品列-->
      <div class="pro">
        <p class="address-title">送货清单</p>

        <!--循环店家-->
        <div v-for="(item,index)  in  setdlist" :key="index" >
          <!--循环店家下面的商品-->
          <div v-for="(items,index)  in  item" :key="index"   style="border-bottom: 1px dashed gainsboro">

            <!--显示店铺名字和优惠券,店铺第一条信息展示-->
            <div class="shopGoods-top">
                 <p v-show="0==index?true:false">{{items.shopMsg.shopName}}</p>
                 <p v-show="0==index?true:false">
                <span class="totalPrice"  v-if="items.shopMsg.shopCouponList">店铺优惠:</span>


                   <!--店铺优惠卷显示-->

                <select name=""   v-if="items.shopMsg.shopCouponList"  v-model="items.shopMsg.userYh"  @change="addYprice(item,items.shopMsg.shopCouponList,items.shopMsg.userYh)">
                     <option :value="itemsm.id"   v-for="itemsm  in  items.shopMsg.shopCouponList">满{{itemsm.couponCondition}}可减{{itemsm.amount}}</option>
                </select>

              </p>
            </div>

            <!--产品盒子-->
            <div class="shopGoods-content" :class="index!=0?'top':''">
               <p>
                <img :src="items.goodsMsg.imgUrl" alt=""  style="border-radius: 10px">
              </p>
               <div>
                <p  class="shopGoods-title">{{items.goodsMsg.goodsTitle}}</p>
                <p>
                  <small>数量:</small>
                  <span>{{items.amount}}</span></p>
                <p class="totalPrice"   id="shopGoods-price">￥{{items.totalP}}</p>
              </div>
            </div>

            <div class="totalNum">
              <div id="totalNum">
                <span>优惠:<span class="thisPrice">￥{{totalYh}}</span></span>
                <span>运费:<span class="thisPrice">￥{{yunmony}}</span></span>
                <span>应付总额:<span class="totalPrice">￥{{totalPrice-totalYh-yunmony}}</span></span>
                <comBtn btnClass="send" btnText="提交订单" @clicked="setPro(items.shopMsg.id)"></comBtn>
              </div>
            </div>
          </div>
        </div>
        </div>



      </div>



   <!--没有数据-->
    <div  v-show="empt"  class="empt">
      <img src="../../../assets/empt.png" alt="">
    </div>
    </div>



</template>

<script>
  export default require("./mycartCtr")

  import './car.css'
</script>

