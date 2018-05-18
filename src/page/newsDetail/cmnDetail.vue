<template>
     <div class="textdetail2">
       <liearnav></liearnav>


       <div class="bigBox">
         <small>
           <span  @click="linkTo('/')"  style="cursor: pointer">主页</span>
           <span>  >  </span>
           <span   @click="goback" style="cursor: pointer">公告</span>
           <span>  >  </span>
           <span style="cursor: pointer"> 详情 </span>
         </small>
         <h3 class="title">{{title.length>20?title.substring(0,20)+"...":title}}</h3>
         <comBtn btnClass="red"  btnText="提问"  @clicked="requise"></comBtn>
         <!--<p>2018-02-30</p>-->
       </div>

       <div class="content">
                <div class="content-top">
                   <textarea name=""  cols="30" rows="10"  v-model="answer"  @focus="backPlacetop">{{this.answer}}</textarea>
                   <div class="vilcode">
                     <img  src="" alt="验证码图片" width="100" height="50"  class="img">
                     <input type="text"  placeholder="请输入验证码"   v-model="imgsrc">
                   </div>
                   <comBtn btnClass="orenge"  btnText="回答"  class="btn"  @clicked="sendAnser"></comBtn>
                </div>

                <div  class="content-bottom">
                  <div class="answerBox"  v-for="item in  anser"  :key="item.id">
                    <div class="textList">
                      <p>{{item.nickname}}</p>
                      <!--<span>{{item.createTime.substring(0,11)}}</span>-->
                      <span>{{item.createTime}}</span>
                    </div>
                    <p  class="words">{{item.content}}</p>
                  </div>
                </div>


         <!--=============================假数据===================-->

       </div>


       <!--分页-->

       <el-pagination
         @current-change="handleCurrentChange"
         :current-page.sync="pageNum"
         :background=true
         :page-size="pageSize"
         layout="prev, pager, next,total"
         :total="total">
       </el-pagination>


       <!--<sfooter></sfooter>-->

       <!--弹框-->
      <div  class="addQuer"  v-show="myShow">
           <i class="el-icon-close"   @click="close"></i>
           <h3>提问</h3>
            <div class="addQuer-text">
                 <p>问题标题：</p>
               <textarea name=""  cols="30" rows="10"  @focus="backPlace"  v-model="placehoder">{{placehoder}}</textarea>
            </div>
          <comBtn btnClass="large"  btnText="提交问题" class="ques" @clicked="sendRequise" ></comBtn>
      </div>

       <!--遮罩层-->
       <div class="zzc"  v-show="isShow"></div>



     </div>
</template>

<script>
  export  default  require('./cmnCtr')
</script>

<style scoped>
  .content{
    min-height: 300px;
    /*border: 1px solid red;*/
  }
  .vilcode{
    width: 150px;
    /*border: 1px solid  red;*/
  }
  .vilcode  input{
    width: 80%;
    margin-top: 20px;
    border-radius: 10px;
    border: 1px solid gainsboro;
    padding: 2%  1%;
    text-indent: 5px;
  }
  .answerBox{
    width: 98%;
    margin: 3% auto;
    /*min-height: 200px;*/
    color: grey;
    padding-bottom:0.5%;
    box-shadow: 1px 1px 2px 1px #c9c9c9;
    border-radius: 10px;
  }
  .textList{
    width: 90%;
    display: flex;
    padding: 1% 0;
    margin: 1% auto;
    font-size: 14px;
    justify-content: space-between;
    border-bottom: 1px solid gainsboro;
  }
  .words{
    width: 90%;
    margin:1.5% auto;
    text-align: left;
    font-size: 12px;
    line-height: 20px;
  }
  .textList p{
    color: rgb(59,149,44);
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
  /*.title{*/
     /*margin-left: 30%;*/
  /*}*/

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
.content-top  {
   width: 66.5%;
  margin: 0  auto;
  text-align: left;
  /*border: 1px solid red;*/
  display: flex;
  height: 110px;

  justify-content: space-between;
}
.ques{
  margin-top: 3%;
}
.content-top  textarea {
  width:60%;
  outline: none;
  padding:  2%;
  color: grey;
  resize:none;
  border-radius: 10px;
  border: 1px solid gainsboro;
  background-color: white;
}
.content-bottom{
  width: 68%;
  margin: 0 auto;
  /*border: 1px solid red;*/
  overflow: hidden;
}
.ovflo{
  height: auto !important;
}
.btn{
margin-top: 5%
}
  .textdetail2{
    /*border: 1px solid red;*/
  }
</style>
