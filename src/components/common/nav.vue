<template>
     <div   class="nav">
       <!--<h1>这是导航</h1>-->
       <div>
             <div  class="left-content">

                    <p>欢迎 <span style="color: red"> {{username}}</span> 来到御心坊！
                      <span class="login"   v-show="sessionType"><router-link to="/login">请登录</router-link></span>

                      <span class="register"   v-show="sessionType"><router-link to="/perRegister">        或免费注册</router-link></span>
                      <span  v-show="username"  style="color: red"  @click="backlogin"   class="right-bor">注销登录</span>
                      <span    @click="linkTo('/check')" > 签到</span></p>
             </div>

           <!--</el-col>-->
           <!--<el-col  class="navContent"  :xs="13" :sm="10" :md="10" :lg="13" :xl="13" >-->
             <ul  class="right-content">
               <li  @click="linkTo('/')"   :class="activeIndex==0?'color':'' ">首页</li>
               <li   @click="linkTop('/personal')"    :class="activeIndex==1?'color':'' ">个人中心</li>
               <li   @click="linkTo('/mecRegister')"   :class="activeIndex==2?'color':'' ">我要入驻</li>
               <li>客户电话：0987-123456</li>
               <!--<li class="iconfont icon-yue"></li>-->
             </ul>
       </div>

     </div>
</template>

<script>
  export default {
    name: 'topnav',
    components: {},
    props: [],
    data() {
      return {
        sessionType: true,
        username: "",
        activeIndex:""
      }
    },
    methods: {
      backlogin() {
        this.$confirm('您是否确定要退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          lockScroll: false
        }).then(() => {

          this.$axios.post('/api/authc/user/logout', {}).then((resp) => {
            console.log(resp);
            if (resp.data.code == 0) {
              sessionStorage.token = "";
              sessionStorage.realName = "";
              sessionStorage.phone = "";
              sessionStorage.nickname = "";
              sessionStorage.type = "";

              this.sessionType = true;
              this.username = "",

                this.$message({
                  message: '您已退出登录',
                  type: 'success',
                  duration: 1500
                });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        });
      },
      linkTo(link) {
       // this.activeIndex=index;
       // console.log(this.activeIndex,"index")
        this.$router.push(link);
      },
      linkTop(link){
        if( this.username==""){
          this.$message({
            message: '请先登录',
            type: 'warning',
            duration:1500
          });
          var  that=this;
          setTimeout(function () {
            that.$router.push("login");
          },1000)

        }else {
          this.$router.push(link);
        }
      }
    },
    mounted() {
      if (sessionStorage.realName) {
        this.username = sessionStorage.realName;
        this.sessionType = false;
      } else {
        this.username = "",
          this.sessionType = true
      }

    }
  }
</script>

<style scoped>
  li{
    list-style: none;
  }
      .nav{
        width:100%;
        padding: 1% 0;
        margin: 0 auto;
        background-color: rgb(246,246,246);
      }
      .nav>div{
          min-width: 1200px;
        margin: 0 auto;
        /*border: 1px solid black;*/
        height: 30px;

      }
  .left-content{
    width: 40%;
    float: left;
    /*border: 1px solid red;*/
    text-align: left;
  }
  .right-content{
    width:50%;
    float: right;
    display: flex;
    justify-content: space-between;
    text-align: right;
    /*border: 1px solid red;*/
  }
  .right-content> li{
    border-left: 1px solid gainsboro;
    /*padding: 0 3%;*/
    /*float: left;*/
    text-indent: 25px;
    /*border: 1px solid black;*/
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
</style>
