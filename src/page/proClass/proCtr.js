// import  topnav  from  "@/components/common/nav"
import  liearnav  from '@/components/common/liearnav'
import  hotProduct  from '@/components/common/hotProduct'
// import  sfooter  from '@/components/common/footer'
export default {
  name: "proClass",
  data(){
    return{
      pageNum:1,
      pageSize:8,
      total:null,
      id:"" ,                          //分类id
      title:"",                              //三级导航名字
      proList:[
        {imgUrl:"static/u33.png",goodsTitle:"小小小米",realPrice:"12:00",oldPrice:"24:00",id:1},
        {imgUrl:"static/u2.jpg",goodsTitle:"小小小米",realPrice:"12:00",oldPrice:"24:00",id:2},
        {imgUrl:"static/u4.jpg",goodsTitle:"小小小米",realPrice:"12:00",oldPrice:"24:00",id:3},
        {imgUrl:"static/u6.png",goodsTitle:"小小小米",realPrice:"12:00",oldPrice:"24:00",id:4},
        {imgUrl:"static/u6.png",goodsTitle:"小小小米",realPrice:"12:00",oldPrice:"24:00",id:5},
        {imgUrl:"static/u6.png",goodsTitle:"小小小米",realPrice:"12:00",oldPrice:"24:00",id:6},
      ] ,                    //产品列表
      bigTitle:""                             //二级菜单
    }

  },
  components:{
    liearnav,
    hotProduct,
  },
  methods:{

    /*
     回到首页
     */
    linkTo(val){
    this.$router.push(val)
},
    /*
    分页
     */
    handleCurrentChange(val){
        this. getDetail(this.id,val,12)
    },

    /*
      获取列表数据
     */
     getDetail(type,num,size){
       this.$axios.get('/anonymous/queryGoodsListByType',{
         params:{
           goodsTypeId:type,pageNum:num,pageSize:size
         }
       }).then((resp) => {
         console.log(resp,"详情类别")
         this.proList=resp.data.data.goodsMsgList.list;
         this.bigTitle=resp.data.data.goodsType.upperGoodsType.typeName;
          this.title=resp.data.data.goodsType.typeName

         //分页赋值
         this.pageNum=resp.data.data.goodsMsgList.pageNum
         this.pageSize=resp.data.data.goodsMsgList.pageSize
         this.total=resp.data.data.goodsMsgList.total
       })
     },

    /*
    加入购物车
     */
    addCar(item){
      localStorage.proId++;
      this.$store.commit('addScore', localStorage.proId)
      console.log(item,"加入购物车id")
    },

  },
  mounted(){
    this.id = this.$route.query.id;
    console.log(  this.id )
    this.getDetail( this.id,1,12)

  }
}
