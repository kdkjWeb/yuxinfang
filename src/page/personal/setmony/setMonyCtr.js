import  comBtn  from '@/components/common/btn'
export default {
  name: "setMony",
  data(){
    return{
      mony:"",
      htmlText:"",
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
      if(this.mony=="") {
        this.$message({
          message: '请输入完整信息',
          type: 'warning',
          duration:1500
        });
        return false;
      }
      this.$axios.post('/authc/pay/addRechargeOrder', {
        totalPrice:this.mony,
        cost:this.mony
        }).then((resp) => {
        if(resp.data.code==0){
          sessionStorage.pam=resp.data.data.id;
          location.href="http://phlwq.mynatapp.cc/yuxinfangDev/authc/recharge/rechargePaidForOrder?orderId="+resp.data.data.id
        }else {
          this.$message({
            message: resp.msg,
            type: 'warning',
            duration:1500
          });
        }

        });
    },

    /*
    返回
     */
    backMony(){
      this.mony=""
    },

    pay(pam){
      this.$axios.get('/authc/recharge/rechargePaidForOrder', {
        params:{
          orderId:pam
        }
      }).then((resp) => {
        console.log(resp,"订单支付")
        if(resp.status==200){



          this.$message({
            message: '充值成功',
            type: 'success',
            duration:1500
          });
        }else {
          this.$message({
            message: resp.data.msg,
            type: 'success',
            duration:1500
          });
        }

        }
      )
    }
  },
  mounted(){
     this.bannas=sessionStorage.balance


    // alert(  this.bannas)
  }
}
