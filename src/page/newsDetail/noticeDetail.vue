<template>
      <div class="textdetail">
        <!--<topnav></topnav>-->
        <liearnav></liearnav>

        <div class="bigBox">
          <small>
            <span  @click="linkTo('/')">主页</span>
            <span>  >  </span>
            <span  @click="goback">公告</span>
            <span>  >  </span>
            <span> 详情 </span>
          </small>
          <h3 class="title">{{textList.title}}</h3>
          <p>{{textList.createTime.substring(0,10)}}</p>
        </div>

        <div class="text">{{textList.content}}</div>
      </div>
</template>

<script>
export  default  require('./ntcCtr')
</script>

<style scoped>
  .textdetail2{

  }
.text{
  /*border: 1px solid red;*/
  width:67%;
  min-height: 300px;
  margin: 0  auto;
  text-align: left;

}
.bigBox{
  width: 66%;
  margin:1.5% auto;
  display: flex;
  color:rgb(59,149,44) ;
  justify-content: space-between;
  border-bottom: 1px solid rgb(59,149,44);
  padding-bottom: 1%;
}
  body,html{
    width: 100%;
    min-height: 100%;
  }

</style>
