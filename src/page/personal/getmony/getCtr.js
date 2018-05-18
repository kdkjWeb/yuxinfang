import  comBtn  from '@/components/common/btn'
export default {
  name: "getMony",
  data(){
    return{
      mony:"",
      bannas:0,               //金币总价
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
       console.log(this.mony)
      // this.$axios.post('/shopMain.do', {
      //     mony:this.mony,

      //   }).then((resp) => {
      //     console.log(resp)
      // this.$message({
      //   message: '充值成功',
      //   type: 'success',
      //   duration:1500
      // });
      //   });
    },

    /*
    返回
     */
    backMony(){
       this.mony=""
    }
  },
  mounted(){
    this.bannas=sessionStorage.balance
  }
}
