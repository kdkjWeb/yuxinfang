<template>
      <div class="shopC">
        <div class="shopCheckC">
           <el-checkbox  class="cheak"></el-checkbox>
        </div>

        <div class="shopGoodsC">

            <div class="shopLeft">
              <img  :src="imgsrc" alt=""  width="120"  height="100" style="border-radius: 10px">
            </div>

          <div  class="shopRight">
            <p>{{ proname }}</p>
            <div  class="rightPrice">
                     <p class="thisPrice">￥{{ price }}</p>
                    <div>
                                <span style="margin-right: 7px">数量</span>
                                <el-input-number  size="mini"  v-model="num7"   :min="1"  @change="getnum"></el-input-number>
                   </div>
                    <p  class="totalPrice">￥{{ oldprice }}</p>
                     <comBtn btnClass="fged"  btnText="删除"  @clicked="open2(pro_id)"></comBtn>
            </div>
            <!--<div class="shopCoupons">优惠券</div>-->
        </div>

      </div>
      </div>
</template>

<script>
  import  comBtn  from '../common/btn'
    export default {
        name: "shopList",
       components:{
         comBtn
       },
      props: ['imgsrc','proname','price','oldprice','pro_id','num7'],
      data() {
          return{
            num7:1,
            totalPrice:"",
            price:56,
          }
      },
      methods:{
        open2(val) {
          var that = this;

          this.$confirm('主人确定不要我了吗?', '提示', {
            confirmButtonText: '是的呢！',
            cancelButtonText: '要要要',
            type: 'success',
            lockScroll:false
          }).then(() => {
            this.$message({
              type: 'info ',
              message: '拜拜啦主人!'
            });
            that.$store.dispatch('delProduct', val);
          }).catch(() => {
            this.$message({
              type: 'success',
              message: '主人我跟你回家！啦啦'
            })
          })
        },
        getnum(val){
           console.log(val)
          this.num7=val;
           this.totalPrice=(this.num7)*(this.price)
        }
      },
      mounted(){
          this.totalPrice=this.price
      }
    }
</script>

<style scoped>
  .cheak{
    position: relative;
    top:-50%
  }

 .shopC{
   width: 100%;
   height: 150px;
   border-bottom: 1px dashed gainsboro;
   margin: 0 auto;
 }
  .shop  img{
    margin-top: 5%;
  }
 .totalPrice{
   color: red;
 }
 .thisPrice{
   color: rgb(253,136,0);
 }


  .shopCheckC,.shopGoodsC{
    float: left;
  }
  .shopCheckC{
    width: 9%;
    line-height: 150px;
  }
  .shopGoodsC{
    width: 90%;
    height: 150px;
  }
  .shopLeft,.shopRight{
    float: left;
  }
  .shopLeft{
    width: 20%;
    height: 100px;
  margin-top: 25px;
  }

  .shopRight{
    width: 76%;
    height: 100px;
    font-size: 14px;
    margin-top:40px;
    margin-left: 2%;
  }
  .shopRight>p{
   text-align: left;
    margin-bottom: 4%;
  }
  .rightPrice{
    margin-bottom: 10px;
    display: flex;
    line-height: 30px;
    justify-content: space-between;
  }

  .shopCoupons{
    text-align: left;
  }




</style>
