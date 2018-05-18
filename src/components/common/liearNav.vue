<template>
  <div   class="minav">
<div>

  <div>
    <img src="../../assets/image/logo.png" alt="" width="120">
  </div>


  <div  class="navContent">
    <div  class="search">
      <input type="text "  placeholder="请搜索食材及其他"   v-model="searchText">
      <span class="search-icon"  @click="search"><i class="el-icon-search"></i></span>
    </div>
  </div>


  <div class="car"  @click="link('/personal')">
    <div class="shopCar">
      <span class="shopCar-icon"><i class="iconfont    icon-gouwuche"></i></span>
      <span class="shopCar-title">购物车</span>
      <span class="shopCar-num">{{addProId}}</span>
    </div>
  </div>
</div>


  </div>
</template>

<script>

  import {mapGetters} from 'vuex'

  export default {
    name: 'liearnav',
    data(){
      return{
        searchText:""
      }

    },
    methods:{
      link(val){
        this.$router.push(val)
      },
      search(){



        this.$axios.post('/anonymous/queryGoodsByKeyWords',{
          keyWord:this.searchText,pageNum:1,pageSize:12
        }).then((resp) => {
          console.log(resp)
          if(resp.data.code==0){
            this.searchText= encodeURI(encodeURI(this.searchText));
            this.$router.push('/search?text='+this.searchText)
          }else {
            this.$message({
              message:resp.data.msg,
              type:"warning"
            })
            return  false;
          }
          console.log(resp,"全局搜索")
        })
      }
    },

    computed: {
      ...mapGetters({
        addProId: 'getTotal'
      }),

    },
  }
</script>

<style scoped>
  .minav{
    /*height: 50px;*/
    width:100%;
    border-bottom: 2px solid  rgb(59,149,44);
    /*padding-top: 1% ;*/
    margin: 0 auto;

    /*background-color: rgb(246,246,246);*/
  }
  .minav>div{
    width: 66%;
    margin: 0  auto;
    /*border: 1px solid red;*/
    padding: 1%  0;
    display:flex;
    justify-content: space-between;
  }
  *{
    font-size: 14px;
  }
  /*
   搜索
   */

  .navContent{
    width: 30%;
    /*border: 1px solid red;*/
  }
  .car{
   width: 13%;
    /*border: 1px solid red;*/
  }
  .search,  .shopCar{
    border: 1px  solid  rgb(59,149,44);
    border-radius: 20px;
    padding: 1% 0;
    position: relative;
    width: 100%;
    height: 60%;
    overflow: hidden;
  }
  .search input{
    border: 0;
    position: absolute;
    left: 3%;
    top:1px;
    font-size: 12px;
    width: 83%;
    height: 100%;
    /*border: 1px solid red;*/
  }
  .search-icon{
    height: 50px;
    display: inline-block;
    position: absolute;
    right: -2%;
    top:0%;
    width: 18%;
    color: white;
    line-height:23px;
    background-color:  rgb(59,149,44);
  }

  /*
  购物车
   */
  .shopCar{
    border: 1px solid gainsboro;
    border-radius: 20px;
    width:100%;
    padding: 2% 1%;
    /*height: 100%;*/
    line-height: 20px;
  }
  .shopCar-icon{
    color: rgb(253,136,0);
    position: absolute;
    left:8%;
    top:10%
  }
  .shopCar-num{
    background-color: rgb(253,136,0);
    height: 50px;
    display: inline-block;
    position: absolute;
    right: -1%;
    top:-2%;
    width: 33%;
  margin-left: 2%;
    color: white;
    line-height:25px;

  }

  .shopCar-title{
    font-size: 12px;
    line-height: 13px;
    margin-right: 5%;
  }
</style>
