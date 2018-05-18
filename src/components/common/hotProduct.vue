<template>
     <div  class="hotProduct" >
       <div class="hotBox">
         <img  :src="imgsrc"  alt="图片显示区域：宽（100%），高（125）">
       </div>
       <div class="textBox">
              <p class="textBox-title">{{ proname }}</p>
              <p class="textBox-price">
                   <span>￥{{ price }}</span>
                   <span  style="text-decoration:line-through">￥{{ oldprice }}</span>
              </p>
       </div>
       <div class="addShopBox"  @click.stop="addCollect(pro_id)" >加入购物车</div>
     </div>
</template>

<script>
export  default  require("./hotProCtr")


</script>

<style scoped>
  .hotProduct{
    width: 30%;
    position: relative;
    font-size: 12px;
    border-radius: 10px;
    margin:8px;
    overflow: hidden;
    border: 1px solid transparent;
    box-shadow: 2px 2px 5px #c9c9c9;
  }
  .hotBox {
    width:100%;
    padding-bottom:75%;
    position:relative;
  }
  .hotBox img {
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    left:0;
  }
  .hotProduct:hover{
    border: 1px solid  rgb(59,149,44);
  }
  .hotProduct:hover    .addShopBox{
    opacity: 1;
  }
  /*.hotProduct  img{*/
    /*width: 100%;*/
    /*height: 125px;*/

  /*}*/
  .hotProduct  .textBox{
    height: 20%;
    width: 94%;
    text-align: left;
    /*border: 1px solid red;*/
    margin: 3% 0;
    padding: 0 3%;
  }
  .textBox-title{
    margin-bottom: 4px;
  }
  .textBox-price{
    display: flex;
    justify-content: space-between;
  }
  .textBox-price span:nth-of-type(1){
    color: red;
  }
  .textBox-price span:nth-of-type(2){
    color: grey;
  }
  .addShopBox{
    position: absolute;
    width: 100%;
    height: 30px;
    background-color:  rgb(59,149,44);
    color: rgba(255, 255, 255, 0.69);
   bottom:55px;
    text-align: center;
    line-height: 30px;
    opacity: 0;
    transition: all .15s linear;
  }
</style>
