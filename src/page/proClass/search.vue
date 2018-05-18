<template>
  <div  class="product">
    <!--<topnav></topnav>-->
    <!--<liearnav></liearnav>-->


    <div class="productBox">

      <hotProduct
        v-for="iteam in  proList"
        :key="iteam.id"
        :proname="iteam.goodsTitle.substring(0,10)+'...'"
        :price="iteam.realPrice"
        :oldprice="iteam.oldPrice"
        :pro_id="iteam.id"
        :imgsrc=" iteam.imgUrl"
        @click.native="linkTo('/proDetail?id='+iteam.id)"
        @addShop="addCar"
      ></hotProduct>

    </div>

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="pageNum"
      :background=true
      :page-size=pageSize
      layout="prev, pager, next,total"
      :total=total>
    </el-pagination>
    <!--<sfooter></sfooter>-->
  </div>
</template>

<script>
  import  liearnav  from '@/components/common/liearnav'
  import  hotProduct  from '@/components/common/hotProduct'


  export default {
    name: "search",
    data(){
      return{
        pageNum:1,
        pageSize:8,
        total:null,
        text:"" ,                          //分类id
        title:"",                              //三级导航名字
        proList:[
          {imgUrl:"static/u33.png",goodsTitle:"小小小米",realPrice:"12:00",oldPrice:"24:00",id:1},
          {imgUrl:"static/u2.jpg",goodsTitle:"小小小米",realPrice:"12:00",oldPrice:"24:00",id:2},
          {imgUrl:"static/u4.jpg",goodsTitle:"小小小米",realPrice:"12:00",oldPrice:"24:00",id:3},
          {imgUrl:"static/u6.png",goodsTitle:"小小小米",realPrice:"12:00",oldPrice:"24:00",id:4},
          {imgUrl:"static/u6.png",goodsTitle:"小小小米",realPrice:"12:00",oldPrice:"24:00",id:5},
          {imgUrl:"static/u6.png",goodsTitle:"小小小米",realPrice:"12:00",oldPrice:"24:00",id:6},
        ] ,              //产品列表
        bigTitle:""                             //二级菜单
      }

    },
    components:{
      liearnav,
      hotProduct,
    },
    methods:{

      /*
      跳转页面
      */
      linkTo(val){
        this.$router.push(val)
      },

      /*
      分页
       */
      handleCurrentChange(val){
        this. getDetail(this.text,val,12)
      },

      /*
        获取列表数据
       */
      getDetail(text,num,size){
        this.$axios.post('/anonymous/queryGoodsByKeyWords',{

          keyWord:this.text,pageNum:num,pageSize:size
        }).then((resp) => {
          console.log(resp)
          if(resp.data.code==0){
              this.proList=resp.data.data.list

          }else {
              this.$message({
                 message:resp.data.msg,
                type:"warning"
              })
            return  false;
          }
          console.log(resp,"全局搜索")

          //分页赋值
          this.pageNum=resp.data.data.pageNum
          this.pageSize=resp.data.data.pageSize
          this.total=resp.data.data.total
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

     var  t = this.$route.query.text;
      this.text=decodeURI(t)

      console.log(  this.text )
      this.getDetail( this.text,1,12)

    }
  }
</script>

<style scoped>
  .bigBox{
    width: 70%;
    margin:1.5% auto;
    display: flex;
    color:rgb(59,149,44) ;
    justify-content: space-between;
    border-bottom: 1px solid rgb(59,149,44);
    padding-bottom: 1%;
  }
  .productBox{
    width:70%;
    /*border: 1px solid red;*/
    margin: 2%  auto;
    display: flex;
    flex-wrap:wrap;
    margin-bottom: 2%;
    justify-content: start;
  }

</style>
