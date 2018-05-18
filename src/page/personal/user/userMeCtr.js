export default {
  name: "userMessage",
  data: function () {
    return {
      activeIndex: 0,
      istrue: 0,
      bannas:0,      //金币余额
      totalMony:0,     //总资产
      cartProducts: [

      ],
      roleId:"",                 //角色id
    }
  },
  methods:{
    show(index){
      this.activeIndex = index;
      switch (index){
        case  0:
          this. getList(1,6,-1);
          break;

        case  1:
          this. getList(1,6,2)
              break;

        case  2:
          this. getList(1,6,5)
          break;

        case  3:
          this. getList(1,6,3)
          break;

        case  4:
          this. getList(1,6,4)
          break;

        case  5:
          this. getList(1,6,1)
          break;
      }
    },
    getList(num,size,sta){
      this.$axios.post('/authc/payment/getPaymentMsg',{
        pageNum:num,pageSize:size,status:sta
      }).then((resp)=>{
        if(resp.data.code==0){
          var a=resp.data.data;
               a.forEach((e,index)=>{
                  a[index].times=a[index].times.substring(0,11)
                 this.$set(a[index],'kinMony', a[index].amount*100)
               })
          this.cartProducts=a

        }else {
          this.cartProducts=[ ]
          this.$message({
            message:resp.data.msg,
            type:"warning"
          })
        }
           console.log(resp,"个人明细")
      })
    },

  //  获取账户信息

    getMony(){
      this.$axios.get('/assetDetail/getEarningDetails').then((resp)=>{
          console.log(resp)

        if(resp.data.code==0){
              this.totalMony=resp.data.data
        }
      })
    }
  },
  mounted(){
    this. getList(1,6,0);
    this.getMony()
    this.bannas=sessionStorage.balance
    this.roleId= sessionStorage.roleId;
  }
}
