<template>
     <div  class="product">
       <!--<topnav></topnav>-->
       <liearnav></liearnav>
       <div class="bigBox">
         <small>
           <span  @click="linkTo('/')">主页</span>
           <span>  >  </span>
           <span @click="linkTo('/')">{{bigTitle}}</span>
           <span >>  </span>
           <span>{{title}}</span>
         </small>
       </div>
       <div class="productBox">

         <hotProduct
           v-for="iteam in  proList"
           :key="iteam.id"
           :proname="iteam.goodsTitle.substring(0,10)+'...'"
           :price="iteam.realPrice"
           :oldprice="iteam.oldPrice"
           :pro_id="iteam.id"
           :imgsrc=" iteam.imgUrl"
           @click.native="linkTo('/proDetail?id='+iteam.id)"
           @addShop="addCar"
         ></hotProduct>

       </div>

       <el-pagination
         @current-change="handleCurrentChange"
         :current-page.sync="pageNum"
         :background=true
         :page-size=pageSize
         layout="prev, pager, next,total"
         :total=total>
       </el-pagination>
       <!--<sfooter></sfooter>-->
     </div>
</template>

<script>
 export  default  require("./proCtr")
</script>

<style scoped>
  .bigBox{
    width: 70%;
    margin:1.5% auto;
    display: flex;
    color:rgb(59,149,44) ;
    justify-content: space-between;
    border-bottom: 1px solid rgb(59,149,44);
    padding-bottom: 1%;
  }
  .productBox{
    width:70%;
    /*border: 1px solid red;*/
    margin: 0  auto;
    display: flex;
    flex-wrap:wrap;
    margin-bottom: 2%;
    justify-content: start;
  }

</style>
