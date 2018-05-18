<template>
  <div class="nav">
        <div    class="topnav">
            <div>
            <div class="left-content">
              <p>欢迎 <span style="color: red"> {{islogin.realName}}</span> 来到御心坊！
                <span class="login" v-show="islogin.realName==null?true:false"><router-link to="/login">请登录</router-link></span>
                <span class="register" v-show="islogin.realName==null?true:false"><router-link to="/perRegister">        或免费注册</router-link></span>
                <span v-show="islogin.realName==null?false:true" style="color: red" @click="backlogin" class="right-bor">注销登录</span>
                <span @click="linkTo('/check',0)"  :class="activeIndex==0?'color':'' "> 签到</span></p>
            </div>
            <ul class="right-content">
              <li @click="linkTo('/',1)" :class="activeIndex==1?'color':'' ">首页</li>
              <li @click="linkTop('/personal',2)" :class="activeIndex==2?'color':'' ">个人中心</li>
              <li @click="linkTo('/mecRegister',3)" :class="activeIndex==3?'color':'' ">我要入驻</li>
              <li>客户电话：0987-123456</li>
            </ul>
          </div>
        </div>



    <div class="contailer">
         <router-view/>
    </div>
    <!--页脚-->
    <div class="footer">
      <p>
        <span>御心坊</span>
        <span>品质生活运营商</span>
      </p>
      <p>@2010-2-17  保留所有权利，御心坊有限公司</p>
      <p>蜀ICP10243588号  公安机关备案sdd43412号</p>
    </div>

  </div>
</template>

<script>
  export default require('./indexCtr');
  // import './index.css'
</script>
<style  scoped>
  .contailer {
    width:100%;
    margin:0 auto;
  }
  .topnav  li{
    list-style: none;
  }
  .nav{
    width:100%;
    margin: 0 auto;
    height: auto;
    /*min-height: 768px;*/
    /*border: 1px solid red;*/
    overflow: hidden;
    position: relative;
    padding-bottom: 10%;
  }
  .nav>.topnav{
    width: 100%;
    min-width: 1200px;
    padding: 1%  0;
    height: 25px;
    background-color: rgb(246,246,246);

  }
  .nav>.topnav>div{
    width: 70%;
    /*min-width: 100px;*/
    margin: 0 auto;
  }

  .left-content{
    width: 40%;
    float: left;
    text-align: left;
  }
  .right-content{
    width:50%;
    float: right;
    display: flex;
    justify-content: space-between;
    text-align: right;
  }
  .right-content> li{
    border-left: 1px solid gainsboro;
    text-indent: 25px;
    text-align: center;
  }
  .login a,.register a{
    color: red;
  }
  .register,.right-bor{
    margin-right: 3%;
    padding-right: 5%;
    border-right: 1px solid gainsboro;
  }
  *{
    font-size: 13px;

  }

  .color{
    color:  rgb(59,149,44);
  }

  body{
    width: 100%;
    min-height: 100%;
  }
  html{
    height: 100%;
    width: 100%;
  }
  .footer{
    width: 100%;
    height:50px;
    font-size: 12px;
    background-color: grey;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 4%;
    padding:2%  0;
    line-height: 22px;
    position: absolute;
    bottom: 0;
    left:0
  }

</style>



