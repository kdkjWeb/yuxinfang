<script src="mainCtr.js"></script>
<template>
  <div  id="box">
    <liearnav></liearnav>

    <!--轮播区-->
    <div class="carousel">
      <div class="left-title">
        <p>全部商品分类</p>
        <ul>
          <li @mouseenter="opaShow" @mouseleave="opahide">
            <i class="el-icon-date"></i>
            <span class="dayHot">每日推荐</span>
          </li>
          <li v-for="(item,index) in goodsType" :key="item.id" @mouseenter="opaShow" @mouseleave="opahide">
            <i class="el-icon-date"></i>
            <div>
              <p :class="{midd:true}">{{item.typeName}}</p>
              <!--<p>-->
              <!--<span  @click=" linkTo('/productDetail?id='+items.id)" v-for="items in item.lowerGoodsType"   style="cursor: pointer" >{{items.typeName}}</span>-->
              <!--</p>-->
            </div>
          </li>


        </ul>
      </div>
      <div class="right-img">
        <p class="carousel-title">
          <span>众筹</span>
          <span>预售</span>
        </p>
        <div class="block">
          <!--<span class="demonstration">默认 Hover 指示器触发</span>-->
          <el-carousel :interval="2000" arrow="always" height="256px">
            <el-carousel-item>
              <figure class="">
                <img src="../../assets/image/index/banner/banner1.jpg" alt=""/>
              </figure>
            </el-carousel-item>
            <el-carousel-item>
              <figure class="">
                <img src="../../assets/image/index/banner/banner2.jpg" alt=""/>
              </figure>
            </el-carousel-item>
            <el-carousel-item>
              <figure class="">
                <img src="../../assets/image/index/banner/banner3.jpg" alt=""/>
              </figure>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <div class="opcaty" v-show="opashow" @mouseenter="selfShow" @mouseleave="selfhide">
        <div v-for="(item,index) in goodsType" :key="item.id">
          <h5>{{item.typeName}} <i class="el-icon-arrow-right"></i></h5>
          <ul>
            <li v-for="items in item.lowerGoodsType" style="cursor: pointer"
                @click="linkTo('/proClass?id='+items.id)">{{items.typeName}}
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!--热门推荐-->
    <div class="hotSend">热门推荐</div>

    <!--下面产品展示区-->
    <div class="goods">


      <!--上面显示区-->
      <div class="goods-top">

        <hotProduct
          v-for="iteam in  proimg"
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


      <!--右面显示区-->
      <div class="newsShow">

        <div class="newsList">
            <div>
              <p class="newsList-title">
                <span>公告</span>
                <span @click=" linkTo('/newsList?type=1')" style="cursor: pointer">更多 <i
                  class="el-icon-arrow-right"></i></span>
              </p>
              <ul>
                <li v-for="item  in noticeList" :key="item.id"
                    @click="linkTo('noticeDetail?id='+item.id)" style="cursor: pointer">
                  {{item.title.substring(0,8)+"..."}}
                </li>
              </ul>
            </div>

        </div>


        <div class="newsList">
          <div>
            <p class="newsList-title">
              <span>社区</span>
              <span @click=" linkTo('/newsList?type=2')" style="cursor: pointer">更多 <i
                class="el-icon-arrow-right"></i></span>
            </p>
            <ul>
              <li v-for="item  in articleList" :key="item.id"
                  @click="linkTo('cmnDetail?id='+item.id)" style="cursor: pointer">
                {{item.title.substring(0,8)+"..."}}
              </li>
            </ul>
          </div>

        </div>


      </div>

      <!--下面显示区-->
      <div class="goods-buttom">
        <hotProduct
          v-for="iteam in  bottomimg"
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

    </div>

  </div>
</template>

<script>
  export default require("./mainCtr")
</script>

<style scoped>
  /*
   影藏二级菜单
    */
  #box{
    min-width: 70%;
    min-width: 1200px;
    /*border: 1px solid red;*/
  }
  .opcaty li {
    list-style: none;
    font-size: 13px;
    border-left: 1px solid gainsboro;
    width: 60px;
    padding: 0 2%;
    line-height: 20px;
    margin-bottom: 5px;
    /*outline: 1px solid red;*/
  }

  .opcaty {
    position: absolute;
    left: 17.3%;
    top: 0;
    width: 72%;
    min-height: 94%;
    z-index: 99;
    padding: 1% 5%;
    height: auto;
    outline: 1px solid gainsboro;
    /*display: none;*/
    background-color: white;
    /*outline: 3px solid black;*/
  }

  .opcaty h4 {
    text-align: right;
    width: 15%;
    /*border: 1px solid red;*/
  }

  .opcaty ul {
    display: flex;
    justify-content: start;
    width: 80%;
    flex-wrap: wrap;
    /*outline:2px solid blue;*/
  }

  .opcaty > div {
    display: flex;
    /*margin: 3%  0;*/
    margin-top: 3%;
    width: 100%;
    justify-content: space-between;
  }

  .midd {
    margin-top: 7px;
  }

  .newsList {
    width:80%;
    padding-bottom: 70%;
    padding: 7%;
    margin-bottom:20px;
    border: 1px solid rgba(128, 128, 128, 0.56);
    border-radius: 10px;
    display: inline-block;
    font-size: 12px;
    background-color: white;
    /*margin-bottom: 6%;*/

  }

  .newsList-title {
    width: 100%;
    border-bottom: 1px solid gainsboro;
    display: flex;
    padding-bottom: 4%;
    justify-content: space-between;
  }

  .newsList-title span:nth-of-type(1) {
    color: rgb(59, 149, 44);
  }

  .newsList ul {
    width: 100%;
    text-align: left;
    /*border: 1px solid gainsboro;*/
  }

  .newsList>div{
    width: 100%;
    min-height: 200px;
    padding-bottom: 15%;
    /*border: 1px solid black;*/
  }
  .newsList ul li {
    margin: 5% 8%;
    width: 80%;
    border-bottom: 1px solid transparent;
  }

  .newsList ul li:hover {
    color: rgb(253, 136, 0);
    border-bottom: 1px solid rgba(253, 136, 0, 0.58);
  }

  .goods-buttom {
    width: 100%;
    height: auto;
    /*border: 1px solid  red;*/
    display: flex;
    justify-content: space-between;
  }

  .goods-top {
    width: 80%;
    height: auto;
    /*border: 1px solid red;*/
    padding: 0 0 10px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content:start;
  }

  .goods {
    width: 70%;
    width: 1200px;
    margin: 0 auto;
    position: relative;
    height: auto;
    /*border: 1px solid  blue;*/
  }

  .hotSend {
    text-align: left;
    width: 68%;
    margin: 2% auto;
    padding-bottom: 1%;
    position: relative;
    right: 1%;
    color: rgb(59, 149, 44);
    border-bottom: 1px solid rgb(59, 149, 44);
  }

  .newsShow {
    width: 23%;
    position: absolute;
    right: 0;
    top: 1%;
    text-align: left;
    /*border: 1px solid red;*/
  }

  .dayHot {
     line-height: 53px;
  }

  .left-title li {
    height: 50px;
    line-height: 20px;
    display: flex;
    text-align: left;
    font-size: 12px;
    justify-content: start;
    /*border: 1px solid red;*/
    /*background-color: gainsboro;*/
  }

  .left-title li:hover, .opcaty li:hover {
    background-color: rgb(255, 241, 240);
    color: red;
  }

  /*.left-title  li:hover   .opcaty{*/
  /*display: block;*/
  /*}*/

  .left-title li div {
    width: 80%;
    /*border: 1px solid red;*/
    margin-top: 5%;
  }

  .left-title li div span {
    font-size: 12px;
    margin-right: 5%;
  }

  .el-icon-date {
    font-size: 16px;
    line-height: 50px;
    margin: 0 6% 0 8%;
  }

  .left-title > p {
    height: 40px;
    background-color: rgb(59, 149, 44);
    color: rgba(255, 255, 255, 0.66);
    line-height: 40px;
    margin-bottom: 8%;
  }

  .carousel-title {
    width: 80px;
    margin: 1.5% auto;
    /*border: 1px solid red;*/
    display: flex;
    position: relative;
    right: 3%;
    justify-content: space-between;
  }

  .carousel {
    width: 70%;
    min-width: 900px;
    margin: 0 auto;
    height: 300px;
    position: relative;

    /*border: 1px solid red;*/
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .left-title {
    width: 17%;
    float: left;
    height: 297px;
    font-size: 14px;

    border: 1px solid rgb(59, 149, 44);
  }

  .right-img {
    width: 80%;
    float: left;
  }


</style>
