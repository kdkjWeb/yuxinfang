// import  topnav  from  "@/components/common/nav"
// import  sfooter  from '@/components/common/footer'
import  comBtn  from '@/components/common/btn'

export default {
  name: "tologin",
  data(){
    return{
      phone:'',
      pass:'',
    }

  },
  components:{
    comBtn
  },
  methods:{
    login(){
         console.log("提交登录");
         console.log(this.phone,"手机号码")
         console.log(this.pass,"密码")

      /*
          验证信息不为空
       */
      if(this.phone==""||this.pass=="") {
        this.$message({
          message: '请输入手机号或密码',
          type: 'warning',
          duration:1500
        });
        return false;
      }


      /*
          验证手机号有效性
       */
      var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(this.phone)) {
        this.$message({
          message: '请输入有效的手机号码',
          type: 'warning',
          duration:1500
        });
        return false;
      }


      /*
          提交信息给后台
       */

      this.$axios.post('/begin/login', {
              phone:this.phone,
              password:this.pass
      }).then((resp) => {
        if(resp.data.code==0){
          this.$message({
            message: '登录成功，为您跳转首页',
            type: 'success',
            duration:1500
          });

          console.log(resp.data.data)
          sessionStorage.islogins=1;

          this.$store.commit('changeLogin', resp.data.data)
          sessionStorage.info=JSON.stringify(resp.data.data)

          // console.log(sessionStorage.info,"login登录信息")
          // sessionStorage.token=resp.data.data.token;
          // sessionStorage.realName=resp.data.data.realName;
          // sessionStorage.phone=resp.data.data.phone;
          // sessionStorage.nickname=resp.data.data.nickname;

          var  len=resp.data.data.sysRole.length;


          sessionStorage.roleId=resp.data.data.sysRole[len-1].id;
          sessionStorage.balance=resp.data.data.balance;

         // alert( sessionStorage.roleId)


          var that=this;
          setTimeout(function () {
            that.$router.push("/");
          },2000)
        }else {

          this.$message({
            message: '登录信息填写错误',
            type: 'warning',
            duration:1500
          });
          return;

        }

      });
    },



    /*
        点击返回
     */


    backlogin(){
         console.log("返回登录")
        this.$router.push("/")
    }
  }
}
