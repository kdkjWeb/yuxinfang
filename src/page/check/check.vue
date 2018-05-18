<template>
    <div id="check">
      <liearnav></liearnav>

      <!--日历box-->
      <div  class="datebox">
            <vue-event-calendar :events="demoEvents" @month-changed="month"   @day-changed="daych"></vue-event-calendar>

        <!--遮罩层-->
        <div class="zzc"></div>

        <!--签到按钮-->
         <div  class="btn"  @click="checkOver">   <el-button type="warning" plain>立即签到</el-button></div>

     <!--遮挡区域-->
        <div  class="hide">
                 <p class="top">签到栏</p>
            <p class="bottom">

            </p>
        </div>

      </div>


    </div>
</template>

<script>
export  default  require("./checkCtr")
</script>

<style scoped>

  .hide{
    width: 53%;
    height: 98%;
    position: absolute;
    right:5px;
    bottom: -10px;
    /*border: 1px solid  red;*/
    background-color: transparent;
  }
  .hide  .top{
    color: white;
    width: 45%;
    height: 5%;
    border-radius: 20px;
    line-height: 250%;
    background-color: #F29543;
    position: absolute;
    top:6%;
    left:30%;
    border: 1px solid white;
  }
  .hide  .bottom{
    width: 100%;
    height: 25%;
    background-color: white;
    position: absolute;
    bottom: 0;
  }


.checkColor{
  color: green !important;
}
.datebox{
   width: 70%;
  margin:2% auto;
  border: 1px solid rgba(242, 149, 67, 0.22);
  padding: 1%;
  border-radius: 20px;
  position: relative;
 /*box-shadow:0px 0px 3px 1px rgba(242, 149, 67, 0.26);*/
}
  .events-wrapper{

  }

  .zzc{
    width: 50%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    z-index: 99;
  }

  .btn{
    position: absolute;
    top:5%;
    left: 20%;
    z-index: 100;
  }


</style>
