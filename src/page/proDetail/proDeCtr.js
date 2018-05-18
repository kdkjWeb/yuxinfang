// import  topnav  from  "@/components/common/nav"
import  liearnav  from '@/components/common/liearnav'
// import  sfooter  from '@/components/common/footer'


export default {
  name: "pro",
  components:{
    liearnav,
  },
  data(){
    return{
      num7:1,
      id:"",    //路由拼接参数
      detailList:""
    }
  },
  methods:{
     // getdtl(){
     //   this.$axios.post('/api/shopMain.do', {
     //      id:this.id
     //     }).then((resp) => {
     //       console.log(resp)
     //     var arr = JSON.parse(JSON.stringify(resp.data.list));
     //
     //     }).catch(() => {
     //
     //   });
     // }

    /*
    加入购物车
     */
    addCar(val){
      localStorage.proId++;
      this.$store.commit('addScore', localStorage.proId)
      this.$axios.post('/dealTrolley/addTrolleyGoods', {
        goodsId:val,
        amount:this.num7,
      }).then((resp) => {
        console.log(resp)
        if(resp.data.code==0){
          this.$message({
            message:"已成功加入",
            type:"success",
            duration:1500
          })
        }else {
          console.log(resp.data.msg)
          this.$message({
            message:resp.data.msg,
            type:"warning",
            duration:1500
          })
        }
      })
    },

    /*
获取详情信息
 */
    getDetail(){
      this.$axios.get('/anonymous/querySingleGoodsMsg',{
        params:{
          goodsId:this.id,
        }
      }).then((resp) => {
        console.log(resp,"产品详情")
        this.detailList=resp.data.data
      });
    }

  },
  mounted(){
    this.id = this.$route.query.id;
    console.log(this.id);
this.getDetail()
    // //商品详情展示列表
    // this.$axios.get('/api/anonymous/queryGoodsList',{
    //   params:{ pageNum:1,pageSize:10}
    // }).then((resp) => {
    //   console.log(resp.data.data.list,"商品");
    //   this.proimg=resp.data.data.list.slice(0,6);
    //   this.bottomimg=resp.data.data.list.slice(6,10);
    //
    // });
    // this.getdtl()
  },

}
