<script src="proDeCtr.js"></script>
<template>
      <div>
           <liearnav></liearnav>
           <div  class="detail">
                <div  class="detail-left">
                     <img  :src="detailList.imgUrl" alt="">
                </div>
                <div   class="detail-right">
                     <p>{{detailList.goodsTitle}}</p>
                      <p>
                            <span>先果价：<span>￥{{detailList.realPrice}}</span></span>
                            <span  class="oldprice">￥{{detailList.oldPrice}}</span>
                      </p>
                  <p>
                        <span>
                          数量
                          <el-input-number   :min="1"  v-model="num7"  label="描述文字" size="mini"  ></el-input-number>
                        </span>
                       <span  class="car"   @click="addCar(detailList.id)"  style="cursor: pointer">加入购物车</span>
                  </p>

                </div>

        </div>

        <!--====================富文本显示区====================-->

        <div class="editor"  v-html="detailList.goodsInfo"></div>
      </div>
</template>

<script>
  export  default  require('./proDeCtr')
</script>

<style scoped>
  .oldprice{
      text-decoration: line-through;
  }
  .detail-right{
    width: 60%;
    text-align: left;
    /*border: 1px solid black;*/

  }
  .detail-right  p{
    margin: 2%;
    width: 85%;
  }

  .editor{
    width:55%;
    height: auto;
    /*border: 1px solid red;*/
    margin: 0  auto;
  }
  .detail-right  p:nth-of-type(2){
    width: 80%;
    padding: 3%;
    color: white;
    display: flex;
    margin: 4% 0;
    margin-bottom: 8%;
    font-size: 14px;
    justify-content: space-between;
      background-color: orange;
  }
  .detail-right  p:nth-of-type(3){
    width: 85%;
    /*padding: 3%;*/
    padding-right: 0;
    display: flex;
    margin: 5% 0;
    font-size: 14px;
    justify-content: space-between;
    /*border: 1px solid  red;*/
  }
  .detail-left{
    width: 30%;
  }
  .detail-left img{
    width: 230px;
    height: 180px;
    margin-top: 5%;
    margin-left: 5%;
  }
  .car{
    background-color: red;
    color: white;
    padding: 1%;
    width: 30%;
    text-align: center;
  }
.detail{
  width: 60%;
  height: auto;
  /*border: 1px solid  red;*/
  margin:1%  auto;
  display: flex;
  padding-left: 3%;
  justify-content: space-between;
}
</style>
