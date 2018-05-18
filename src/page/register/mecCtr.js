// import  topnav  from '@/components/common/nav'
// import  sfooter  from '@/components/common/footer'
import  comBtn  from '@/components/common/btn'

export default {
  name: "mecRegister",
  data(){
    return{
      sname:"",    //商家姓名
      name:"",          //姓名
      pototest:"请上传营业执照",            //营业执照
      phone:"",                  //电话
      monnyno:"",           //银行卡号
      zfbno:"",                 //支付宝
      pass:"",                     //密码
      onepass:"",                   //确认密码
      validCode:"",                          //验证码
      idCard:"",                               //身份证
      niname:"" ,                                 //昵称
      imgurl:""
    }


  },
  components:{
    comBtn
  },
  methods:{
     /*
      上传营业执照
      */
    file(){
      var  that=this;
       var  reader=new  FileReader();
      reader.readAsDataURL($("#fileimg  input")[0].files[0]);
      reader.onload=function () {
        that.imgurl=$("#fileimg  input")[0].files[0];
        that.$message({
          message: '照片上传成功',
          type: 'success',
          duration:1500
        });
        that.pototest="已上传"
      }
    },


    /*
    发送验证码
   */
    sendPhone(){
      if(this.phone==""){
        this.$message({
          message: '请先输入手机号码',
          type: 'warning',
          duration:1500
        });
        return;
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
      if(this.sname==""||this.name==""||this.phone==""||
        this.pototest==""||this.monnyno==""||this.zfbno==""||
        this.pass==""||this.onepass=="") {
        this.$message({
          message: '请输入完整信息',
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
     var  form=new  FormData();
      form.append('shopName',this.sname);
      form.append('realName',this.name);
      form.append('phone',this.phone);
      form.append('bankCard',this.monnyno);
      form.append('alipayAccount',this.zfbno);
      form.append('validCode',this.validCode);
      form.append('password',this.pass);
      form.append('licenseFile',  this.imgurl);
      form.append('ensurePassword',this.onepass);
      form.append('idCard',this.idCard);
      form.append('nickname',this.niname);
       console.log( this.imgurl,"照片")
      this.$axios.post('/begin/anonymousShopRegister',
                form
        ).then((resp) => {
          if(resp.data.code==0){
            this.$message({
              message: '注册成功，为您跳转登录',
              type: 'success',
              duration:1500
            });
            var that=this;
            setTimeout(function () {
              that.$router.push("login")
            },2000)

          }else {
            this.$message({
              message: resp.data.msg,
              type: 'warning',
              duration:1500
            });
          }
          console.log(resp)
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
