
import  comBtn  from '@/components/common/btn'

import E from 'wangeditor';
// import {mapGetters} from "vuex/types/index";
import {mapGetters} from 'vuex'

// import $ from 'jquery'
export default {
  name: "userCms",
  components: {
    comBtn,
  },
  data: function () {
    return {
      form: {
        account: '',
        starTime:'',
        endTime:'',
        speak:'',
        id:"",
        stadus:null,
      },
      dialogFormVisible: false,
      formLabelWidth: '150px',
      editor:null,
      radio:"1",                  //商家单选
      roleId:null,
      claId:null,                  //新增判断是否选择了类
      smallList:null,
      activeIndex: 0,
      totalMony:0,
      addStart:false,         //新增修改的页面
      topcont:true,    //最上面商家显示
      midcont:true,    //中间产品增删改

      searchtest:null,                 //点击搜索
      proID:"",                           //搜索商品的id
      iszzc:false,                          //富文本层级

      tpageNum:0,                 //当前在第几页,上面分页
      tpageSize:0,                     //每页显示多少条
      ttotal:null ,                                //总共多少条

      bpageNum:0,                 //当前在第几页,下面分页
      bpageSize:0,                     //每页显示多少条
      btotal:null ,                                //总共多少条

      btnTexts:"暂停",                      //按钮文字

      addPro:{
        addName:"",              //新增商品的名称
        yprice:"",                        //优惠价格
        sprice:"",                        //市场价格
        imgsrc:"",                         //图片路劲；
        editorContent: '',         //富文本内容
        id:"",                         //商品id
        units:"",                             //单位
        proClasss:"0",                   //商品类型
      },
      yimg:"",                                  //营业执照照片
      yimgShow:false,                      //营业执照是否显示
      userType:1,                //商户类型,确定上面是否显示红色导航
      smalluserType:0,                   //查询哪种类型

      treeNodes:[],                                   //树结构数据
      cartProducts: [],
      yhlist:[                      //优惠券
        {monny:"10",starttime:"2017-02-34",endtime:"2018-03-23",id:1,speak:"满66元可使用"},
        {monny:"10",starttime:"2017-02-34",endtime:"2018-03-23",id:2,speak:"满66元可使用"},
        {monny:"10",starttime:"2017-02-34",endtime:"2018-03-23",id:3,speak:"满66元可使用"},
        {monny:"10",starttime:"2017-02-34",endtime:"2018-03-23",id:4,speak:"满66元可使用"},
      ],
      smallTree:"",                           //是否显示子树

      //==============================优惠券
      yhArr:{
        yhId:null,
        yhshow:false,                 //优惠券显示
        amount:null,
        beginTime:null,
        stopTime:null,
      },




      proDetailList:[],                //商品分类；

      roleId:"",                        //用户角色
      proClass:[ ],                //商品类型查询
      id:-1,
    }
  },
  methods: {
    dateChangebirthday(val){
      this.form.starTime = val;
      console.log( this.form.starTime)
    },
    showSmallTree(val){
       this.smallTree=val
    },

    getCoun(val){
        console.log(val,"单元格数据")
        this.yimg=val.licenseUrl;
        this.id=val.id;                    //店家id
        this.ownerId=val.ownerId;
        this.proDetailList=[  ]
        this.getAllMsg(1,6,null,this.id)
    },
    /*
    获取该店铺所有的数据
     */
    getAllMsg(num,size,type,shop){
       this.$axios.get('/authc/admin/shop/getGoodsListByShopId',{
          params:{
            pageNum:num,pageSize:size,goodsTypeID:type,shopId:shop
          }
       }).then((resp)=>{
         console.log(resp,"商户商品")
         if(resp.data.code==0){
                   this.proDetailList=resp.data.data.list;
                   this.bpageNum=resp.data.data.pageNum;
                   this.bpageSize=resp.data.data.pageSize;
                   this.btotal=resp.data.data.total;
         }else {
             // this.$message({
             //   message:resp.data.msg,
             //   type:"warning",
             //   duration:1500
             // })
         }
       })
    },

    /*
    下面商品分页
     */
    bhandleCurrentChange(val){
      this.getAllMsg(val,6,null,this.id)
    },

    /*
    点击某一个类查询相应的列表
     */
    getD(id,e){

      if(this.id==""){

      }
       this.getAllMsg(1,6,id,this.id);
      var el = event.currentTarget;


      this.claId=id;
      $(".redC").css("color","black")
      $(el).css("color","red");
    } ,

/*
获取单行优惠券
 */

    getYhmony(val){
      console.log(val)
      this.form.yhId=val.id;
      console.log( this.form.yhId)
      this.form.account=val.amount;
      this.form.starTime=val.beginTime;
      this.form.endTime=val.stopTime;
      this.form.speak=val.couponCondition;
    },







    /*
查询不同类型的商户，正常、待审核、暂停
 */
 getShop(type,num,size){
   this.$axios.get('/authc/shop/getCurrentShopMsg', {
       params:{
         status:type, pageNum:num,pageSize:size
       }
     }).then((resp) => {
        var  a=resp.data.data;
     a.forEach((e,index)=>{
       a[index].createTime=  a[index].createTime.substring(0,11)
     })
     this.cartProducts=a;

     });
 },

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
  根据不同的商户查询商品
   */

  getShopClass(type,num,size){
    // this.$axios.post('/shopMain.do', {
    //     type:this.index, pageNum:num,pageSize:size
    //   }).then((resp) => {
    //     console.log(resp)
    // if(resp.data.code==0){
      //    this.cartProducts=resp.data.data.list
    // }else{
    //   });
  },






    /*
    点击不同的商户，获取数据
     */
    show(index) {
      this.activeIndex = index;
      switch (index) {
        case 0:
          this.yimg=""
          this.smalluserType=0;
            this.userGetShop(this.smalluserType,1,3)
          this.btnTexts="暂停";
          break;
        case 1:
          this.yimg=""
         this.getDsh()
          this.btnTexts="审核";
          break;
        case 2:
          this.yimg=""
            this.smalluserType=1;
            this.userGetShop(this.smalluserType,1,3)
          this.btnTexts="恢复";
          break;
      }
    },


    /*
    待审核商家
     */
    getDsh(){
      this.$axios.get('/authc/admin/shop/getAuditList', {
        params:{
          status:0,
          pageNum:1,
          pageSize:3
        }
      }).then((resp) => {
        console.log(resp,"待审核商家")
        if(resp.data.code==0){
          var  a=resp.data.data;
          this.tpageNum=resp.data.data.pageNum
          this.tpageSize=resp.data.data.pageSize
          this.ttotal=resp.data.data.total,

            a.forEach((e,index)=>{
              a[index].applyTime=  a[index].applyTime.substring(0,11)
            })
          this.cartProducts=a;
        }else {
          this.cartProducts=[ ]
          this.$message({
            message:resp.data.msg,
            type:"warning",
            duration:1500
          })
        }

      });
    },


    /*
    上面商户分页变化，获取数据
     */
    thandleCurrentChange(val){
      this.userGetShop( this.smalluserType,val,3)
    },

    linkTo(link) {
      this.$router.push(link);
    },


    /*
    点击查看营业执照
     */
    showyimg(){
    if(  this.yimg==""){
      this.$message({
        message: '请先选择数据',
        type: 'warning',
        duration:1500
      });
      return false;
    }

      this.yimgShow=true;
      $(".yyphoto  img").attr("src",   this.yimg)
    },

    /*
      点击屏幕关闭营业执照
     */
    closeyimg(){
      this.yimgShow=false
    },


   /*
   操作商家按钮
    */
    handle(){
      if(this.yimg==""){
        this.$message({
          message: '请先选择数据',
          type: 'warning',
          duration:1500
        });
        return false;
      }

      if(this.activeIndex==0){
        this.$axios.post('/authc/admin/shop/bannedShop?shopId='+this.id).then((resp)=>{
          if(resp.data.code==0){
            this.$message({
              message:"商家暂停成功",
              type:"success"
            })
            this.userGetShop(this.smalluserType,1,3)
          }else {
            this.$message({
              message:resp.data.msg,
              type:"warning"
            })
          }
        })
      }else  if(this.activeIndex==1){
        this.$confirm('是否确定该商家审核通过?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          lockScroll:false
        }).then(() => {
          this.$axios.post('/authc/admin/shop/auditShop',{
            id:this.id,
            status:1,
            ownerId:this.ownerId
          }).then((resp)=>{
            if(resp.data.code==0){
              this.$message({
                message:"审核通过",
                type:"success",
                duration:1500
              })
              this.userGetShop(this.smalluserType,1,3)
            }else {
              this.$message({
                 message:resp.data.msg,
                 type:"warning",
                duration:1500
              })
            }
             console.log(resp,"审核")
          })
        })
      }else  if(this.activeIndex==2){
        this.$axios.post('/authc/admin/shop/unBanShop?shopId='+this.id).then((resp)=>{
          console.log(resp)
          if(resp.data.code==0){
            this.$message({
              message:"商家解禁成功",
              type:"success"
            })
            this.userGetShop(this.smalluserType,1,3)
          }else {
            this.$message({
              message:resp.data.msg,
              type:"warning",
              duration:1500
            })
          }
        })
      }
    },


    /*
      点击商家新增按钮，切换显示
     */
    addPer(){
       this.addPro.addName="";            //新增商品的名称
      this.addPro.yprice="";                     //优惠价格
      this.addPro. sprice="";                       //市场价格
      this.addPro. imgsrc="";                         //图片路劲；
      this.addPro.editorContent='';         //富文本内容
      this.addPro. id="";                        //商品id
      this.addPro. units="";                         //单位
      this.addPro. proClasss="0";
      this.editor.txt.html("");
      if( this.roleId==3){
        if(this.id==null){
          this.$message({
            message:"请先选择商户",
            type:"warning",
            duration:1500
          })
          return  false;
        }
      }

if(this.claId==null){
        this.$message({
          message:"请先选择分类",
          type:"warning",
          duration:1500
        })

  return  false;
}



      this.addStart=true;
      this.topcont=false;
      this.midcont=false;
      this.getProClass();


    },


    /*
    获取商品类型，众筹，预售
     */
    getProClass(){
      this.$axios.get('/anonymous/getSalesTypes').then((resp)=>{
          console.log(resp,"商品种类");

          var a=resp.data.data;
          for(var i  in a){
            this.proClass.push(a[i])
          }
      })
    },

    /*
         点击新增页面的保存,保存新增或者修改的内容
     */

    getContent() {
      /*
    验证基本信息，不能为空
      */
      if(this.addPro.addName==""|| this.addPro.yprice==""||this.addPro.sprice=="") {
        this.$message({
          message: '请输入完整信息',
          type: 'warning',
          duration:1500
        });
        return false;
      }


      /*
        图片为空
       */
      if(this.addPro.imgsrc=="") {
        this.$message({
          message: '商品图片不能为空，请上传',
          type: 'warning',
          duration:1500
        });
        return false;
      }


      /*
         图片为空
       */
      if(this.addPro.proClasss=="0") {
        this.$message({
          message: '请选择商品类型',
          type: 'warning',
          duration:1500
        });
        return false;
          }
      /*
         单位为空
       */
      if(this.addPro.units=="") {
        this.$message({
          message: '请选择商品单位',
          type: 'warning',
          duration:1500
        });
        return false;
      }


      /*
       提示详情为空
       */
      if(this.addPro.editorContent=="") {
        this.iszzc=true;
        this.$confirm('您还未填写详情内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.iszzc=false;
          this.$message({
            type: 'success',
            message: '新增成功',
            duration:1500
          });
        })
      };

      if(this.addPro.id==""||this.addPro.id==undefined){
        var  form=new  FormData()
        form.append('goodsTitle',this.addPro.addName)
        form.append('goodsName',this.addPro.addName)
        form.append('goodsTypeId',this.claId)
        form.append('storeCount',20000)
        form.append('units',this.addPro.units)
        form.append('realPrice',this.addPro.yprice)
        form.append('oldPrice',this.addPro.sprice)
        form.append('imgFile',this.addPro.imgsrc)
        form.append('shopId',this.id)
        form.append('salesTypeId',this.addPro.proClasss)
        form.append('goodsInfo',this.addPro.editorContent)

        this.$axios.post('/authc/shop/addGoods',
          form,
        ).then((resp)=>{
          if(resp.data.code==0){
            this.$message({
              message:"新增成功",
              type:"success",
              duration:1500
            })
            this.addStart=false;
            this.topcont=true;
            this.midcont=true;
          }else {
            this.$message({
              message:resp.data.msg,
              type:"warning",
              duration:1500
            })
          }
          console.log(resp)
        })
      }else {
        console.log("修改")
        var  form=new  FormData();

        form.append('goodsTitle',this.addPro.addName)
        form.append('goodsName',this.addPro.addName)
        form.append('id',this.addPro.id)
        form.append('storeCount',20000)
        form.append('units',this.addPro.units)
        form.append('realPrice',this.addPro.yprice)
        form.append('oldPrice',this.addPro.sprice)
        form.append('imgFile',this.addPro.imgsrc)
        form.append('shopId',this.id)
        form.append('salesTypeId',this.addPro.proClasss)
        form.append('goodsInfo',this.addPro.editorContent)

        this.$axios.post('/authc/shop/editGoodsMsg',
          form,
        ).then((resp)=>{
          if(resp.data.code==0){
            this.$message({
              message:"修改成功",
              type:"success",
              duration:1500
            })
          }else {
            this.$message({
              message:resp.data.msg,
              type:"warning",
              duration:1500
            })
          }
        })
      }
    },


    /*
    新增页面的上传图片，本地显示
     */
    imgfile(){
       var render=new  FileReader();
      render.readAsDataURL($("#file")[0].files[0]);
      render.onload=function () {
         $(".imgShow  img").attr("src",this.result)
      }

      console.log($("#file")[0].files[0])
      this.addPro.imgsrc=$("#file")[0].files[0];

    },



    /*
    新增返回,优惠卷返回，返回上一页
     */
    closeAdd(){
      this.addStart=false;
      this.topcont=true;
      this.midcont=true;
      this.yhArr.yhshow=false;
    },

/*
    点击删除优惠卷
 */
    handleDelete() {
      if(this.form.yhId==null) {
        this.$message({
          message: "请选择需要修改的数据",
          type: "warning",
          duration: 1000
        })
      }else {
         this.$axios.delete('/authc/shop/deleteShopCoupon?couponId='+this.form.yhId).then((e,index)=>{
             console.log(resp)
           if(resp.data.code==0){
               this.$message({
                 message:"删除成功",
                 type:"success",
                 duration:1500
               })
             this. yhjPer()

           }else {
             this.$message({
               message:resp.data.msg,
               type:"warning",
               duration:1500
             })
           }
         })
      }
    },



    /*
     点击编辑优惠卷
     */
    updateY() {
      this.form.stadus=2;                        //2为修改，1为新增
    if(this.form.yhId==null){
       this.$message({
         message:"请选择需要修改的数据",
         type:"warning",
         duration:1000
       })
      return  false;
    }else {
      this.dialogFormVisible=true;
    }

    },



    /*
    点击商家删除
     */

    delePer(){
      /*
验证信息不为空
*/
      if(this.addPro.id=="") {
        this.$message({
          message: '请先选择要删除数据',
          type: 'warning',
          duration:1500
        });
        return false;
      }

      var  proid=this.addPro.id;                      //要删除的那条数据的id


      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
        lockScroll:false,
      }).then(() => {
        this.$axios.delete('/authc/shop/deleteGoodsMsg?id='+proid).then((resp)=>{
           console.log(resp);
           if(resp.data.code==0){
              this.$message({
                message:"删除成功",
                type:"success",
                duration:1500
              })
             this.getAllMsg(1,6,null,null)

           }else {
             this.$message({
               message:resp.data.msg,
               type:"warning",
               duration:1500
             })
           }
        })
      })
    },


/*
   下方商品选取框变化存那条数据
 */
    selected(val){

      console.log(val)
      this.addPro.id=val.id;
      this.addPro.addName=val.goodsName;
      this.addPro.yprice=val.oldPrice;
      this.addPro.sprice=val.realPrice;
      this.addPro.imgsrc=val.imgUrl;
      this.addPro.units=val.units;
      this.addPro.editorContent=val.goodsInfo;

      console.log(   this.addPro.id,11)
      console.log(   this.addPro.addName,11)
      console.log(   this.addPro.yprice,11)
      console.log(  this.addPro.sprice,11)
      console.log(   this.addPro.imgsrc,11)
      console.log(     this.addPro.editorContent,11)
    },
    /*
      点击商家修改
     */
    updaPer(){
      console.log(this.addPro.id,"修改的id")
      /*
验证信息不为空
*/
      if(this.addPro.id=="") {
        this.$message({
          message: '请先选择要修改数据',
          type: 'warning',
          duration:1500
        });
        return false;
      }

      this.addStart=true;
      this.topcont=false;
      this.midcont=false;
      this.editor.txt.html(this.addPro.editorContent);
      this.getProClass();
    },

    /*
     点击商家搜索
     */
    search(){
        console.log(this.searchtest)
      /*
验证信息不为空
*/
      if(this.searchtest==null) {
        this.$message({
          message: '请先输入关键字',
          type: 'warning',
          duration:1500
        });
        return false;
      }

      this.$axios.post('/authc/shop/queryGoodsMsgByKeyWords', {
        keyWord:this.searchtest,
        pageNum:1,
        pageSize:6,
        shopId:this.id
        }).then((resp) => {
          this.proDetailList=resp.data.data.list;
          this.searchtest="";
          console.log(resp)
        });

    },
    /*
    点击优惠券,跳转页面，请求优惠券列表
     */

    yhjPer(){
      //返回本店所有优惠券；
    var  id="";
      if(  this.roleId==2){
        id=this.islogin.shopMsg.id;
      }else {
        id=this.id
      }
      this.$axios.get('/coupon/getAllowedCoupon',{
        params:{
          shopId:id
        }
      }).then((resp)=>{
        if(resp.data.code==0){
           var  a =JSON.parse(JSON.stringify(resp.data.data));
          a.forEach((e,index)=>{
              a[index].beginTime=  a[index].beginTime.substring(0,11)
              a[index].stopTime=  a[index].stopTime.substring(0,11)
          })

          this.yhlist=a;
          this.yhArr.yhshow=true;
          this.addStart=false;
          this.topcont=false;
          this.midcont=false;
          console.log(resp,"当前店铺所有优惠券")
        }else {
          this.$message({
            message:resp.data.msg,
            type:"warning",
          })
        }
      })

    },


    /*
     点击优惠券弹框确定
     */
    addYHJ(){
      if(this.form.stadus==1){
        console.log(this.form.starTime)
        console.log(this.form.endTime)
        this.$axios.post('/authc/shop/addShopCoupon',{
          amount:this.form.account,
          couponCondition:this.form.speak,
          beginTime:this.form.starTime,
          stopTime:this.form.endTime
        }).then((resp)=>{
          if(resp.data.code==0){
            this.$message({
              message:"新增成功",
              type:"success",
              duration:1500
            })
            this.yhlist.unshift(obj);
            this.dialogFormVisible=false;
          }else {
            this.$message({
              message:"请保持数据完整",
              type:"warning",
            })
          }
        })
      }else {
        this.$axios.post('/authc/shop/addShopCoupon',{
          amount:this.form.account,
          couponCondition:this.form.speak,
          beginTime:this.form.starTime,
          stopTime:this.form.endTime,
          id:this.form.yhId,
        }).then((resp)=>{
          if(resp.data.code==0){
            this.$message({
              message:"修改成功",
              type:"success",
              duration:1500
            })
            this.dialogFormVisible=false;
          }else {
            this.$message({
              message:"请保持数据完整",
              type:"warning",
            })
          }
        })
      }
      console.log(this.form.account)
      console.log(this.form.speak)
      console.log(this.form.starTime)
      console.log(this.form.endTime)
    },

    /*
    点击取消
     */
    close(){
      this.dialogFormVisible=false;
    },


    /*
    新增优惠券
     */
    open5() {
      this.form.stadus=1;
      this.dialogFormVisible=true;
      this.form.account="";
      this.form.starTime="";
      this.form.endTime="";
      this.form.speak="";
    },




    /*
    ====================================树形结构===========================
     */
    getTree(){
      //商品种类
      this.$axios.get('/anonymous/queryAllGoodsType').then((resp) => {
        console.log(resp,"商品分类")
        var arr = resp.data.data;
        this.treeNodes=resp.data.data;
        // this.goodsType = arr;
        arr.forEach((e, index) => {
          if (arr[index].lowerGoodsType == undefined) {
            arr[index].lowerGoodsType = [ ];
            this.smallList = false;
          } else {
            this.smallList = true;
          }
        });
      })

    },

    /*
     新增大类
     */
    addP(){
       var newtree={
                typeName:"  ",
                 lowerGoodsType:[]
       }
      this.treeNodes.push(newtree);

    },
/*
     新增和修改大类
 */
    updateC(id,event){
      var el = event.currentTarget;
      if(id==undefined||id==""){
        this.$axios.post('/authc/admin/goodsType/addGoodsType',{
            typeName:$(el).text()
          }
        ).then((resp)=>{
          if(resp.data.code==0){
            this.$message({
              message:"新增成功",
              type:"success",
              duration:1500
            })
            var  len= this.treeNodes.length;
            this.treeNodes[len-1].id=resp.data.data.id;
            console.log(resp.data.data.id,"新增大类");
          }
        })
      }else{
        this.$axios.post('/authc/admin/goodsType/addGoodsType',{
            typeName:$(el).text(),
             id:id
          }
        ).then((resp)=>{
          if(resp.data.code==0){
            this.$message({
              message:"修改成功",
              type:"success"
            })
          }
          // else {
          //   this.$message({
          //     message:resp.data.msg
          //   })
          // }
        })
      }
    },
    /*
    删除大类
     */
    deleC(val,i){
      this.$axios.delete('/authc/admin/goodsType/deleteGoodsType?id='+val).then((resp)=>{
         if(resp.data.code==0){
            this.$message({
              message:"删除成功",
              type:"success"
            })
         }else {
           this.$message({
             message:resp.data.msg,
             type:"warning"
           })
         }
      })
      this.treeNodes.splice(i,1)
    },
/*
    新增小类
     */
    addC(val,i){
      // alert("新增")
      var newtree={
        typeName:" ",
      }

      if(this.treeNodes[i].lowerGoodsType){
         this.treeNodes[i].lowerGoodsType.push(newtree)
      }else {
        this.treeNodes[i].lowerGoodsType = [ ];
        this.treeNodes[i].lowerGoodsType.push(newtree)

      }

      // console.log( this.treeNodes[i].lowerGoodsType)
      },

    /**
     *
        新增和编辑小类
     *pid    父级id
     * id   子级id
     * event   事件源
     *
     */
    updateS(pid,id,event){
      var el = event.currentTarget;
      if(id==undefined||id==""){
        this.$axios.post('/authc/admin/goodsType/addGoodsType',{
            typeName:$(el).text(),
            upperGoodsType:{
            id:pid
             }
          }
        ).then((resp)=>{
          console.log(resp,"新增成功小类")
          if(resp.data.code==0){
            this.$message({
              message:"新增成功",
              type:"success",
              duration:1500
            })
            this.treeNodes.forEach((e,index)=>{
                if(  this.treeNodes[index].id==pid){
                     console.log(this.treeNodes[index],"ppp")
                  var  len=this.treeNodes[index].lowerGoodsType.length;
                  this.treeNodes[index].lowerGoodsType[len-1].id=resp.data.data.id
                }
            })
          }
        })
      }else{
        this.$axios.post('/authc/admin/goodsType/addGoodsType',{
            typeName:$(el).text(),
            id:id
          }
        ).then((resp)=>{
          if(resp.data.code==0){
            this.$message({
              message:"修改成功",
              type:"success"
            })
          }
        })
      }
    },
    /*
删除小类
 */
    deleS(val,i,index){
      this.$axios.delete('/authc/admin/goodsType/deleteGoodsType?id='+val).then((resp)=>{
        if(resp.data.code==2030){
          this.$message({
            message:"删除成功",
            type:"success"
          })

          var  node=this.treeNodes;
          node[index].lowerGoodsType.splice(i,1)




          // var  node=this.treeNodes;
          // node[index].lowerGoodsType.splice(i,1)
          //
          // console.log(node[index],"父级")
          // this.treeNodes.forEach((e,index)=>{
          //   if(  this.treeNodes[index].id==pid){
          //     var  len=this.treeNodes[index].lowerGoodsType.length;
          //     if(  this.treeNodes[index].lowerGoodsType[i].id==val){
          //
          //     }
          //
          //    }
          // })


        }else {
          this.$message({
            message:resp.data.msg,
            type:"warning"
          })
        }
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

  computed: {
    ...mapGetters({
      islogin: 'getStadus'
    }),

  },



  mounted() {

    this.editor = new E('#editorElem');
    this.editor.customConfig.uploadImgShowBase64=true;
    this.editor.customConfig.onchange = (html) => {
      this.addPro.editorContent = html
    };
    this.editor.create();


    var len=this.islogin.sysRole.length;
    this.roleId=this.islogin.sysRole[len-1].id;
    console.log( this.roleId," this.roleId")
    this.getTree();
     this. getMony()
    if(this.roleId==2){
      this.getShop(  this.smalluserType,1,3)
        this.getAllMsg(1,6,null,null)
    }else {
      this.userGetShop(this.smalluserType,1,3)
    }

    this.roleId=sessionStorage.roleId;


  }

}
