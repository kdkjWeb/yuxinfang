
<script src="../../login/loginCtr.js"></script>
<template>
     <div class="box">
        <!--<topnav></topnav>-->
       <div class="content">
            <div  class="content-left">
                 <ul>

                   <li  @click="link(0)"  :class="0==leftIndex?'hover': ''">
                         <i class="iconfont    icon-gouwuche"></i>
                         <span  class="dayHot">购物车</span>
                   </li>


                   <li  @click="link(1)"  :class="1==leftIndex?'hover': ''"  >
                        <i class=" el-icon-document"></i>
                        <span  class="dayHot">订单信息</span>
                   </li>

                   <li   @click="link(2)"   :class="2==leftIndex?'hover': ''">
                       <i class="iconfont    icon-wode"></i>
                       <span  class="dayHot">账户信息</span>
                   </li>

                   <li   @click="link(3)"   :class="3==leftIndex?'hover': ''">
                     <i class="iconfont      icon-tixian2 "></i>
                     <span  class="dayHot">充值</span>
                   </li>

                   <li   @click="link(4)"   :class="4==leftIndex?'hover': ''">
                     <i class="iconfont    icon-zhuanzhang"></i>
                     <span  class="dayHot">转账</span>
                   </li>

                   <li  @click="link(5)"   :class="5==leftIndex?'hover': ''">
                     <i class="iconfont    icon-tixian1"></i>
                     <span  class="dayHot">提现</span>
                   </li>


                  <li  @click="link(6)"   :class="6==leftIndex?'hover': ''"   v-if="roleId!=1?true:false">
                        <i class="iconfont    icon-touziguanlifei"></i>
                        <span  class="dayHot">商户管理</span>
                  </li>

                   <li  @click="link(7)"   :class="7==leftIndex?'hover': ''"  v-if="roleId!=1?true:false">
                     <i class="iconfont    icon-touziguanlifei"></i>
                     <span  class="dayHot">商户订单</span>
                   </li>
                 </ul>
            </div>

            <div  class="content-right"   :class="leftIndex==6?'noborder':''"   >
                 <router-view/>

            </div>
       </div>
       <!--<sfooter  class="footer"></sfooter>-->
     </div>
</template>

<script>
    export  default  require('./personalCtr')
</script>

<style scoped>
.noborder{
  border: none !important;
}
  .proname{
    width: 300px;
    position: relative;
    z-index: 99;
    text-align: left;
  }
  *{
    margin: 0;
    padding: 0;
  }

  .totalNum>div{
    display: flex;
    width: 200px;
    margin-right: 2.5%;
    float: right;
    margin-top: 1.5%;
    justify-content: space-between;
  }
  li{
    list-style: none;
    border-bottom: 1px solid  gainsboro;
    padding:15%;
    text-align: left;
    font-size: 14px;
    width: 69%;

  }

  .hover{
    background-color:rgb(255,241,240);
    color: red;
  }
.content{
   width: 70%;
  margin: 2% auto;
  height: auto;
  overflow: hidden;
}
  .content-left{
    width: 15%;
    height:71.2%;
    float: left;
    margin-right: 3%;
    border: 1px solid rgb(59,149,44);
  }
  .content-right{
    height: auto;
    width:80%;
    float: left;
    font-size: 12px;
    overflow: hidden;
    border: 1px solid rgb(59,149,44);
  }

  .el-table thead{
    background-color: rgb(59,149,44) !important;
  }
  @media (max-width: 768px)
  {
    body
    {
      font-size: 12px;
    }
  }

  .productImg img{
    width: 100%;
    height: 100%;

  }

</style>
