
import  comBtn  from '@/components/common/btn'

export default {
  name: "business",
  components:{
    comBtn
  },
  data(){
    return{
      tpageNum:0,
      tpageSize:0,
      ttotal:0,

      pageNum:0,
      roleId:"",               //角色id
      pageSize:0,
      total:0,

      shopId:null,                 //店铺id
      cartProducts: [

        ],
      proList:[

      ],

      proName:"",              //查询商品名
      starTime:"",
      endTime:"",
      bisName:"",                //查询店家
    }
  },
  methods:{
    handleCurrentChange(){
         this.getProList()
    },
    /*
查询商户
*/

    userGetShop(type,num,size){
      this.$axios.get('/authc/admin/shop/getShopMsgList', {
        params:{
          status:type, pageNum:num,pageSize:size
        }
      }).then((resp) => {

        if(resp.data.code==0){
          var  a=resp.data.data.list;
          this.tpageNum=resp.data.data.pageNum
          this.tpageSize=resp.data.data.pageSize
          this.ttotal=resp.data.data.total

          a.forEach((e,index)=>{
            a[index].createTime=  a[index].createTime.substring(0,11)
          })
          this.cartProducts=a;
        }else {
          this.cartProducts=[  ]
          this.$message({
            message:resp.data.msg,
            type:"warning",
            duration:1500
          })
        }

        console.log( this.cartProducts," this.cartProducts")
      });
    },


  /*
  商户分页
   */
    thandleCurrentChange(val){
      this.userGetShop(0,val,3)
    },

  /*
  点击店家查询数据
   */
    getCoun(val){
       this.shopId=val.id;
       this.getProList(  this.shopId,0,1,6,this.proName,this.starTime,this.endTime)
    },

    /*
      下面列表数据显示
     */
    getProList(id,stadus,num,size,key,start,end){
       this.$axios.get('/authc/shop/getCurrentOrderForm',{
          params:{
             shopId:id,
             status:stadus,
             pageNum:num,
             pageSize:size,
            keyWord:key,
            beginTime:start,
            stopTime:tend
          }
       }).then((resp)=>{
          if(resp.data.code==0){
               this.proList=resp.data.data.list;
               this.pageNum=resp.data.data.pageNum;
               this.pageSize=resp.data.data.pageSize;
               this.total=resp.data.data.total;
          }else {
             this.$message({
               message:resp.data.msg,
               type:"warning",
               duration:1500
             })
           }
       })
    },

    /*
    根据不同的状态查询下面数据列表
     */
    getStadus(val){

      if(this.roleId==2){
        this.shopId==null;
      }else {
        if( this.shopId==null){
          this.$message({
            message:"请先选择店铺",
            type:"warning",
            duration:1500
          })
          return  false
        }
      }

       switch (val){
         case  0:
           this.proList=[ ]
           this.getProList(this.shopId,1,1,6,this.proName,this.starTime,this.endTime);
           break;
         case 1:
           this.proList=[ ]
           this.getProList(this.shopId,3,1,6,this.proName,this.starTime,this.endTime);
           break;
         case 2:
           this.proList=[ ]
           this.getProList(this.shopId,7,1,6,this.proName,this.starTime,this.endTime);
           break;
         case 3:
           this. updaEdi()
           break;
       }
    },

    /*
       修改备注
     */
    updaEdi(){
      this.$prompt('请输入备注信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        lockScroll:false
      }).then(({ value }) => {

   this.$axios.get('/',{
     params:{

     }
   }).then((resp)=>{
       if(resp.data.code==0){
         this.$message({
           type: 'success',
           message: '你的备注是: ' + value
         });
       }else {
         this.$message({
           type: 'warning',
           message: resp.data.msg
         });
       }
   })





      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },

    /*
        查询上面店家
    */
    search(){
       this.$axios.post('/authc/admin/shop/queryShopByKeyWords',{
         keyWord:this.bisName,
         pageNum:1,
         pageSize:3
       }).then((resp)=>{
         console.log(resp);
         this.cartProducts=resp.data.data.list;
         this.tpageNum=resp.data.data.pageNum
         this.tpageSize=resp.data.data.pageSize
         this.ttotal=resp.data.data.total
       })
    },


    /*
    查询下列商品
     */
    searchPro(status,id){
      if(this.proName==""&&this.starTime==""&&this.endTime==""){
           this.$message({
             message:"请输入查询条件",
             type:"warning",
             duration:1500
           })
      }
      this.getProList()

    }

  },
  mounted(){

     this.roleId= sessionStorage.roleId;
     if(this.roleId==2){
         this.getProList(null,1,1,6,this.proName,this.starTime,this.endTime)      //下面列表数据
     }else {
       this.userGetShop(0,1,3)                     //上面商家数据
       this.getProList( this.shopId,1,1,6,this.proName,this.starTime,this.endTime)
     }

  }
}
