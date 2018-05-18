import yhmonny from '@/components/common/yhmonny'
import comBtn from '@/components/common/btn'
import shopList from '@/components/common/shopList'
import    "./common"
export default {
  name: "mycart",
  components: {
    comBtn,
    shopList,
    yhmonny,
    bannas:0,

  },
  data() {
    return {
      loading:true,
      index: true,
      dindex: false,
      empt:false,
      checked: false,                        //全选按钮
      totalPrice: 0,        //总价
      totlaNum: "",       //总数量
      numPrice: "",        //随着数量变后的价格
      num7: 1,
      adrName: "",
      adrPhone: "",
      btnshowy: true,
      btnshow: false,                         //优惠券已领取显示
      btnshowid: null,
      adress: "",
      yshow: "",                       //优惠券是否显示
      yhmony: 0,
      yunmony: 0,                   //运费
      qdlist: [],                           //清单显示数据
      carList: [],
      yhlist: [],                        //优惠卷清单
      shoplist: [],
      list: {
        1: [
          {
            id: 1,
            amount: 2,
            shopMsg: {
              shopName: "南方家私"
            },
            goodsMsg: {
              imgUrl: "static/u33.png",
              goodsTitle: "樱桃大大的",
              realPrice: "12.00",
              oldPrice: "23"

            }
          },

          {
            id: 2,
            amount: 2,
            shopMsg: {
              shopName: "南方家私"
            },
            goodsMsg: {
              imgUrl: "static/u2.jpg",
              goodsTitle: "樱桃大大的",
              realPrice: "12.00",
              oldPrice: "23"

            }
          },
          {
            id: 3,
            amount: 2,
            shopMsg: {
              shopName: "南方家私"
            },
            goodsMsg: {
              imgUrl: "static/u2.jpg",
              goodsTitle: "樱桃大大的",
              realPrice: "12.00",
              oldPrice: "23"

            }
          },
        ],
        // 2:[
        //   {
        //     id:1,
        //     amount:2,
        //     shopMsg:{
        //       shopName:"北方家私"
        //     },
        //     goodsMsg:{
        //       imgUrl:"static/u6.png",
        //       goodsTitle:"樱桃大大的",
        //       realPrice:"12.00",
        //       oldPrice:"23"
        //
        //     }
        //   },
        //
        //   {
        //     id:2,
        //     amount:2,
        //     shopMsg:{
        //       shopName:"南方家私"
        //     },
        //     goodsMsg:{
        //       imgUrl:"static/u2.jpg",
        //       goodsTitle:"樱桃大大的",
        //       realPrice:"12.00",
        //       oldPrice:"23"
        //
        //     }
        //   },
        // ],
      },
      setdlist: {},                  //订单对象
      suerY:"",                  //选择优惠卷id
      totalYh:0,              //优惠卷 总价

    }
  },
  methods: {
    /*
    点击去结算，跳转结算页
     */

    /*
    全选
     */
    allCheck() {
      this.totalPrice=0;
      for (var key in  this.carList) {
        var p = this.carList[key];
        var len = p.length;
        for (var i = 0; i < len; i++) {
          if(this.checked==false){
            p[i].goodsMsg.checked = false;
          }else {
            p[i].goodsMsg.checked = true;
            this.qdlist.push(p[i])
            this.totalPrice =this.$c.accAdd(p[i].totalP, this.totalPrice)
          }
        }
      }
    },


    /*
       点击结算，跳至结算页
     */
    open2() {
      console.log(this.carList)

      if( this.qdlist.length==0){
         this.$message({
             message:"请先选择数据再结算",
              type:"warning",
         })
         return  false;
      }

      this.index = false;
      this.dindex = true;

      /*
     把数据整合，以数组的id作为键分类
     */
      var json = {};
      for (var i = 0; i < this.qdlist.length; i++) {
        var _key = this.qdlist[i].shopMsg.id;
        console.log(this.qdlist, "清单数据")

        if (!json[_key]) {
          json[_key] = [];
          json[_key].push(this.qdlist[i])
        } else {
          json[_key].push(this.qdlist[i])
        }

        console.log(json)
        this.setdlist = json;             //订单组
      }


      //获取地址，和优惠券
      this.$axios.get('/authc/user/getUserMsg').then((resp) => {
        console.log(resp, "个人信息")
        this.adrName = resp.data.data.receiveName;
        this.adrPhone = resp.data.data.receivePhone;
        this.adress = resp.data.data.receiveAddress;
      })

    },


    /*
    提交订单
     */
    setPro(id) {

      if(this.adrName==""||this.adrPhone==""||this.adress==""){
            this.$message({
              message:"请填写完整的收货信息",
              type:"warning",
              duration:1500
            })

        return  false;
      }






      var  list=[];
      var  slist=[]
      for (var i  in this.setdlist) {
        var obj={};
        if( this.setdlist[i][0].shopMsg.userYh==""){
          obj.shopId=Number(i);
          obj.orderFormGoods=  this.setdlist[i];
        }else {
          obj.shopId=Number(i);
          obj.orderFormGoods=  this.setdlist[i];
          obj.couponId= this.setdlist[i][0].shopMsg.userYh;
        }

         list.push(obj)

      }

      console.log(list,"list")
       this.$axios.post('/authc/pay/addGoodsBoughtOrder',{
         totalPrice:this.totalPrice,
          cost:this.totalPrice-this.totalYh,
          shopMsgList:list,
       }).then((resp)=>{
          console.log(resp)
         if(resp.data.code==0){
             this.$message({
                 message:"订单提交成功",
                 type:"success",
             })



         }else {
           this.$message({
             message:resp.data.msg,
             type:"warning",

           })
         }
       })


    //  支付接口
      this.$axios.post('/authc/pay/paidForBoughtOrder?ordersId='+id).then((resp)=>{
          console.log("订单付款")
          console.log(resp)
      })
    },


    /*
       优惠券显示,    获取当前店铺所有优惠券
     */
    clickS(val, shopid) {
      this.$axios.get('/coupon/getAllowedCoupon', {
        params: {
          shopId: shopid
        }
      }).then((resp) => {
        if (resp.data.code == 0) {
          this.yshow = val;
        } else {
          this.yshow = null;
          this.$message({
            message: resp.data.msg,
            type: "warning",
          })
        }
        console.log(resp.data.data, "当前店铺所有优惠券")
        this.yhlist = resp.data.data;
      })
    },

/*
优惠卷价格
 */
    addYprice(total,item,val){
      this.totalYh=0;
      var a=0;
      console.log(total,"总价")
      total.forEach((e,index)=>{
          a+=total[index].totalPrice
      })
      item.forEach((e,index)=>{
        if(item[index].id==val){
            if(a<item[index].couponCondition){
              this.$message({
                message: '您还没有达到使用优惠卷的条件哦',
                type: 'warning',
                duration: 1500
              });


              for (var i  in this.setdlist) {
                this.setdlist[i][0].shopMsg.userYh=""
              }
              this.totalYh-=0;
            }else {
              this.totalYh+=item[index].amount
            }
        }
      })

    },
/*
    点击领取优惠券
     */
    getyh(val) {
      /*
      领取某一张后传给后台
       */
      this.$axios.post('/coupon/addOneCoupon?couponId=' + val).then((resp) => {
        var that = this;
        if (resp.data.code == 0) {
          this.$message({
            message: '领取成功',
            type: 'success',
            duration: 1500
          });

          setTimeout(function () {
            that.yshow = ""
          }, 1500)

        } else {
          this.$message({
            message: resp.data.msg,
            type: "warning",
          })
          setTimeout(function () {
            that.yshow = ""
          }, 1500)
        }
      })


    },
    /*
    删除购物车商品
     */
    dele(val) {
      console.log(val, "删除商品id");
      // var that = this;
      this.$confirm('主人确定不要我了吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
        lockScroll: false,
      }).then((resp) => {

        //点击删除，传该条数据id
        if (resp == "confirm") {
          this.$axios.post('/dealTrolley/deleteTrolleyItem?trolleyId=' + val).then((resp) => {
            console.log(resp)
            if (resp.data.code == 0) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getCar()
            }
          })
        } else {
          this.$message({
            type: 'success',
            message: '主人我跟你回家！啦啦'
          })
        }

      }).catch(() => {

      })
    },

    /*
    返回上一页
     */
    backAdr() {
      this.$confirm('便宜不等人，请三思而行~', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll:false,
      }).then((resp) => {
          if (resp == "confirm") {
            this.index = true
            this.dindex = false;
            this. getCar()
          } else {

          }
        }
      )

    },
    /*
      保存地址
     */
    saveAdr() {
      /*
验证信息不为空
*/
      if (this.adrName == "" || this.adrPhone == "" || this.adress == "") {
        this.$message({
          message: '请输入完整信息',
          type: 'warning',
          duration: 1500
        });
        return false;
      }
      ;

      /*
验证手机号有效性
*/
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(this.adrPhone)) {
        this.$message({
          message: '请输入有效的手机号码',
          type: 'warning',
          duration: 1500
        });
        return false;
      }

      this.$axios.post('/authc/user/editReceiveMsg', {
        receiveName: this.adrName,
        receivePhone: this.adrPhone,
        receiveAddress: this.adress
      }).then((resp) => {
        console.log(resp)
        if (resp.data.code == 0) {
          this.$message({
            message: '地址保存成功',
            type: 'success',
            duration: 1500
          });
        }


      });

    },



    //计数器改变的时候,购物车数量改变
    getnum(val) {

      var a = {
        totalPrice: this.price,
      }

      this.$axios.post('/dealTrolley/updateTrolleyAmount', {
        id: val.id,
        amount: val.amount
      }).then((resp) => {
        console.log(resp)
      })

//      该条总价
this. everP()

      //选中数据之后，数量变化，总价变化
  this. checkChange()

    },

    everP() {
      //该条数量变化，该条相应价格变化
      for (var key in  this.carList) {
        var p = this.carList[key];
        var len = p.length;
        for (var i = 0; i < len; i++) {
          p[i].totalP =this.$c.accMul(p[i].goodsMsg.realPrice ,p[i].amount) ;
        }
      }
    },
    /*
    购物车数据被选中
     */
    checkChange() {
      this.qdlist = []
      this.totalPrice = 0
      for (var key in  this.carList) {
        var p = this.carList[key];
        var len = p.length;
        for (var i = 0; i < len; i++) {
          //最底部所有总价
          if (p[i].goodsMsg.checked == true) {
            this.everP()
            this.totalPrice =this.$c.accAdd(p[i].totalP, this.totalPrice)
            this.qdlist.push(p[i])
            this.checked=true
          }

          if(p[i].goodsMsg.checked == false){
            this.checked=false
          }
        }
      }
    },


    //计算单条数据总价
    getTotla() {
      for (var key in  this.carList) {
        var p = this.carList[key];
        var len = p.length;
        for (var i = 0; i < len; i++) {
          this.totalPrice += p[i].goodsMsg.realPrice * p[i].amount
        }
      }
    },


    /*
    获取购物车数据
     */
    getCar() {
      this.$axios.get('/dealTrolley/getTrolleyMsg').then((resp) => {
        console.log(resp, "购物车数据")

          this.loading=false

 if(resp.data.code==0){
   var shoplist = resp.data.data;
   for (var key in   shoplist) {
     var p = shoplist[key];
     var len = p.length;
     for (var i = 0; i < len; i++) {
       // 把所有购物车里面的数据多加一个状态，还有价格，用于算总价

       this.$set(p[i].goodsMsg, 'checked', false)
       this.$set(p[i], 'totalP', p[i].goodsMsg.realPrice)
       this.$set(p[i].shopMsg, 'userYh', "")

       p[i].totalPrice = p[i].goodsMsg.realPrice * p[i].amount
       p[i].totalP = p[i].goodsMsg.realPrice * p[i].amount
     }
     this.carList = resp.data.data;
   }
 }

   if( resp.data.data==undefined|| resp.data.data=="") {
     this.empt=true;
     this.index=false;
     this.dindex=false;

   }



      })
    }
  },
  mounted() {
    //购物车数据
    this.getCar()
    this.bannas=sessionStorage.balance


  }
}
