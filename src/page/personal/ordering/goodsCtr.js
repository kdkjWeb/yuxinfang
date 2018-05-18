import  redNav  from '@/components/common/redBtnNav'
import  comBtn  from '@/components/common/btn'
import  dshopList  from '@/components/common/dshopList'
export default {
  name: "goodslist",
  components: {
    redNav,
    dshopList,
    comBtn
  },
  data() {
    return {
      loading:true,
      activeIndex: 0,           //当前选中
      isShow:false,
      proList: [

      ],
      pageNum:1,
      pageSize:3,
      total:100,
      tabShow:"",
      statusText:"待付款"                //订单文字
    }
  },
  methods: {
    /*
     请求订单状态
     */
    show(index) {
      this.activeIndex = index;
      switch (index) {
        case 0:
          this.isShow=false;
          this.statusText="待付款 ";
          this. getList(0,1,3)
          break;
        case 1:
          this.isShow=true;
          this.statusText="待收货 ";
          this. getList(1,1,3)
          break;
        case 2:
          this. getList(3,1,3)
          this.isShow=false;
          this.statusText="退款/退货 ";
          break;
        case 3:
          this.isShow=false;
          this.statusText="全部订单 ";
          this. getList(-1,1,3)
          break;
      }
    },

    /*
    获取订单信息
      */

    getList(status,num,size){
        this.$axios.post('/authc/pay/selectOrderList',{
             status:status,pageNum:num,pageSize:size
        }).then((resp)=>{
          this.loading=false;
          if(resp.data.code==0){
              this.tabShow=1;
              console.log(resp.data.data.list,"订单数据");

              var a=resp.data.data.list;
              a.forEach((e,index)=>{
                 if(a[index].status==0){
                   a[index].status="未付款"
                 }else  if(a[index].status==1){
                   a[index].status="待收货"
                 }else  if(a[index].status==3){
                   a[index].status="退款退货"
                 }
              })
            this.proList=a;

              this.pageNum=resp.data.data.pageNum;
              this.pageSize=resp.data.data.pageSize;
              this.total=resp.data.data.total;
              //
              //
              // var obj={ };
              //
              // a.forEach((e,index)=>{
              //      var _key=a[index].shopId;
              //      if(!obj[_key]){
              //        obj[_key]=[ ];
              //        obj[_key].push(a[index])
              //      }else {
              //        obj[_key].push(a[index])
              //      }
              // });
              // this.proList=obj;
              //  console.log( this.proList , "列表")



          }else {
                this.tabShow=2;
                  this.$message({
                     message:resp.data.msg,
                     type:"warning"
                  })

          }
        })
    },

    /*
    分页
     */
    handleCurrentChange(val){
      var  stadus;
      switch (this.activeIndex){
        case  0:
          stadus=0;
          break;
        case  1:
          stadus=1;
          break;
        case  2:
          stadus=3;
          break;
        case  3:
          stadus=-1;
          break;
      }
      this. getList(stadus,val,3)
    },


    /*
    取消订单
     */
    back(id){
         this.$axios.post('/authc/pay/cancelOrderForm?orderId='+id).then((resp)=>{
             if(resp.data.code==0){
                this.$message({
                  message:"订单取消成功",
                  type:"success",
                  duration:1500
                })
               this. getList(0,1,3)

             }else{
               this.$message({
                 message:resp.data.msg,
                 type:"warning"
               })
             }
         })
    }
  },
  mounted(){
     this. getList(0,1,3)
  }
}
