<template>
      <div  class="newsList">
            <p class="newsList-title">
               <span>公告</span>
              <router-link to="/newsDetail">
                <span  @click="godetail('type')">更多 <i class="el-icon-arrow-right"></i></span>
              </router-link>

            </p>
        <ul>
            <li  v-for="item  in textTist">{{item.title}}</li>
        </ul>
      </div>
</template>

<script>
    export default {
        name: "newsBox",
        props:["titleText","item1","item2","item3","item4","item5"],
      // data(){
      //     return {
      //
      //     }
      // }
    }
</script>

<style scoped>
   .newsList{
     width:155px;
     height:150px;
     padding: 7%;
     border: 1px solid rgba(128, 128, 128, 0.56);
     border-radius: 10px;
     display: inline-block;
     font-size: 12px;
     background-color: white;
     margin-bottom: 6%;
   }
  .newsList-title{
    width: 100%;
    border-bottom: 1px solid gainsboro;
    display: flex;
    padding-bottom: 4%;
    justify-content: space-between;
  }
  .newsList-title span:nth-of-type(1){
    color:  rgb(59,149,44);
  }

   .newsList ul{
     width: 100%;
     text-align: left;
   }

   .newsList ul li{
     margin:6%  8%;
     width: 70%;

     border-bottom: 1px solid transparent;
   }
   .newsList ul li:hover{
      color:rgb(253,136,0);
     border-bottom: 1px solid rgba(253, 136, 0, 0.58);
   }
</style>
