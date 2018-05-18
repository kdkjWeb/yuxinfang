<template>
     <div  class="redBtn">
             <ul>
               <li  @click="show(0)"    :class="activeIndex==0?'hover':''">代付款</li>
               <li  @click="show(1)"    :class="activeIndex==1?'hover':''">待收货</li>
               <li  @click="show(2)"    :class="activeIndex==2?'hover':''">退款/退货</li>
               <li  @click="show(3)"    :class="activeIndex==3?'hover':''">全部订单</li>
             </ul>
     </div>
</template>

<script>
    export default {
        name: "redNav",
       data(){
          return {
             activeIndex:0
          }
      },
        methods:{
          show(index){
            this.activeIndex=index
    }
       }
    }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
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
