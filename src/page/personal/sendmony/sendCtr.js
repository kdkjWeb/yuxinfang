import  comBtn  from '@/components/common/btn'
export default {
  name: "sendMony",
  data(){
    return{
      mony:"",
      phone:"",
      bannas:0,      //金币余额
    }
  },
  components:{
    comBtn,
  },
  methods:{
    /*
提交数据
*/
    getMony(){
      /*
验证信息不为空
*/
      if(this.mony==""||this.phone=="") {
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

      this.$axios.post('/business/transferAccount?amount='+this.mony+'&aimPhone='+this.phone).then((resp) => {
          console.log(resp)
        if(resp.data.code==0){
          this.$message({
            message: '转账成功',
            type: 'success',
            duration:1500
          });
        }else {
            this.$message({
               message:resp.data.msg,
              type: 'warning',
            })
        }


        });
    },

    /*
    返回
     */
    backMony(){
      this.mony=""
      this.phone=""
    }
  },
  mounted(){
    this.bannas=sessionStorage.balance
  }
}
