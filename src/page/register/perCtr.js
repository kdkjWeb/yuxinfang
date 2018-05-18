// import  topnav  from '@/components/common/nav'
// import  sfooter  from '@/components/common/footer'
import  comBtn  from '@/components/common/btn'
export default {
  name: "perRegister",
  data(){
     return{
       name:"",                         //姓名
       phone:"",                            //电话
       preno:"",                                    //身份证
       monyno:"",                                 //银行卡
       zfbno:"",                                         //支付宝
       pass:"",                                        //密码
       onepass:"",                                //确认密码
       tjmno:"",                                        //推荐码
       validCode:"",                                //验证码
       niname:""                                         //昵称
     }
  },
  components:{
    comBtn
  },
  methods:{
    /*
      发送验证码
     */
    sendPhone(){
      if(this.phone==""){
        this.$message({
          message: '请先输入手机号',
          type: 'warning',
          duration:1500
        });
        return false;
      }
      this.$axios.get('/begin/getValidCode', {
        params:{ phone:this.phone}
        }).then((resp) => {
          console.log(resp)
        this.$message({
          message: '验证码已发送至手机',
          type: 'success',
          duration:1500
           });
        });

      console.log("发送验证码")
    },


    /*
       发送注册信息
     */
    register(){
      console.log("发送注册信息")



      /*
    验证信息不为空
 */
      if(this.name==""||this.phone==""||this.preno==""||
        this.monyno==""||this.zfbno==""||this.pass==""||
        this.onepass=="") {
        this.$message({
          message: '请输入完整信息',
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
          验证身份证
       */
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!reg.test(this.preno)) {
        this.$message({
          message: '请输入有效的省份证',
          type: 'warning',
          duration:1500
        });
        return false;
      }



      /*
        验证两次密码是否一样
       */
      if(this.pass!=this.onepass){
        this.$message({
          message: '两次密码不一致',
          type: 'warning',
          duration:1500
        });
        return false;
      }

    /*
        验证密码长度,大于六位
     */

      var passreg = /^.{6,}$/;
      if(!passreg.test(this.pass)){
        this.$message({
          message: '密码不能小于六位',
          type: 'warning',
          duration:1500
        });
        return false;
      }








      /*
     提交信息给后台
  */

      this.$axios.post('/begin/register ', {
        realName:this.name,
        password:this.pass,
        phone:this.phone,
        validCode:this.validCode,
        alipayAccount:this.zfbno,
        bankCard:this.monyno,
        ensurePassword:this.onepass,
        idCard:this.preno,
        referralCode:this.tjmno,
        nickname:this.niname

      }).then((resp) => {
          console.log(resp)
        this.$message({
          message: '注册成功，为您跳转登录',
          type: 'success',
          duration:1500
        });
        var that=this;
        setTimeout(function () {
          that.$router.push("login")
        },2000)
      });


    },





    /*
      返回注册
     */
    backregister(){
      console.log("返回注册")
      this.$router.push({
        name:"index"
      });
    }



  }

}
