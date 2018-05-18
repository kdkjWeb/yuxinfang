<template>
     <div class="detail">
       <!--<topnav></topnav>-->
       <liearnav></liearnav>


       <minNav   :smalltitle="this.title">
             <comBtn btnClass="red"  btnText="提问"  slot="requse"  v-if="this.type==2"   @click.native="requise"></comBtn>
       </minNav>



     <!--下面列表-->
       <div  class="newListText">
         <div class="textList"  @click="linkgo(item.id,item.title)"  v-for="item in textTist"  :key="item.id" >
            <p>{{item.title}}</p>
            <span>{{item.createTime.substring(0,10)}}</span>
         </div>



       </div>
       <el-pagination
         @current-change="handleCurrentChange"
         :current-page.sync="pageNum"
       :background=true
       :page-size="pageSize"
       layout="prev, pager, next,total"
       :total="total">
       </el-pagination>


       <!--弹框-->
       <div  class="addQuer"  v-show="myShow">
         <i class="el-icon-close"   @click="close"></i>
         <h3>提问</h3>
         <div class="addQuer-text">
           <p>问题标题：</p>
           <textarea name=""  cols="30" rows="10"  @focus="backPlace"  v-model="placehoder">{{this.placehoder}}</textarea>
         </div>
         <comBtn btnClass="large"  btnText="提交问题" class="ques" @clicked="sendRequise" ></comBtn>
       </div>

       <!--遮罩层-->
       <div class="zzc"  v-show="isShow"></div>

       <!--<sfooter></sfooter>-->

     </div>
</template>

<script>
 export  default  require('./newsCtr')
</script>

<style scoped>

  .addQuer-text{
    text-align: left;
    margin:10%   5%;
    text-indent: 1em;
  }
  .addQuer-text  textarea{
    height: 80px;
    width: 96%;
    border-radius: 10px;
    padding: 2%;
    margin-top: 3%;
    outline: none;
    resize:none;
    background-color: white;
    border: 1px solid gainsboro;
  }
  .el-icon-close{
    font-size: 25px;
    position: absolute;
    color: grey;
    right: 10px;
    top:10px
  }
  .addQuer h3{
    color: rgba(0, 0, 0, 0.67);
    margin: 6% auto;

  }
  .zzc{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left:0;
    background-color: rgba(0, 0, 0, 0.51);
  }
  .addQuer{
    width: 400px;
    height: 330px;
    position: fixed;
    top:20%;
    left:50%;
    margin-left: -150px;
    z-index: 3;
    background-color: white;
    border-radius: 10px;
    box-shadow: 1px 1px 2px 1px #c9c9c9;
  }


.newListText{
  width: 70%;
  margin: 0 auto;
  margin-bottom: 2%;
  min-height: 300px;
  /*border: 1px solid red;*/
}
.textList{
  width: 90%;
  display: flex;
  padding: 2% 0;
  margin: 0 auto;
  font-size: 13px;
  cursor: pointer;
  justify-content: space-between;
  border-bottom: 1px solid gainsboro;
}
</style>
