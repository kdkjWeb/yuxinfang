export default {
  name: "hotProduct",
  props: ['imgsrc','proname','price','oldprice','pro_id'],

  methods:{
    addCollect(val){
      this.$emit("addShop");
      console.log(val,"加入购物车id")

      this.$axios.post('/dealTrolley/addTrolleyGoods', {
        goodsId:val,
        amount:1,
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
    }
  },

}
