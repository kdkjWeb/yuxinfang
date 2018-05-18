// import  topnav  from  "@/components/common/nav"
import  liearnav  from '@/components/common/liearnav'
import  minNav  from '@/components/common/minNav'
import  comBtn  from '@/components/common/btn'
import  answerBox  from '@/components/common/answerBox'
export default {
  name: "cmnDetail",
  data(){
    return{
      isShow:false,
      myShow:false,
      id:"",                       //详情ida
      secon:true,
      title:"",                   //传过来的标题
      placehoder:"请输入您要问的问题" ,  //问题；
      answer:"写答案...",
      anser:[
        {id:1,nickname:"张三",createTime:"2018-01-23",content:"世界上最遥远的距离，诗句，作者说法较多，一说出自张小娴的小说《荷包里的单人床》，另一说出自印度著名诗人泰戈尔诗集《飞鸟集》，但《飞鸟集》中并未收录近似诗句，大抵是因为其中一个版本最后一句中有“世界上最遥远的距离是飞鸟与鱼的距离”，被一些人认为是泰戈尔所创作，但到目前为止没有客观证据说明泰戈尔创作过类似诗句。原句为：“世界上最遥远的距离，不是生与死的距离，不是天各一方，而是，我就站在你的面前，你却不知道我爱你”，该句可在张小娴作品《荷包里的单人床》中找到。“世界上最遥远的距离”此句诗现在版本较多，多为网友创作。"},
        {id:2,nickname:"张三",createTime:"2018-01-23",content:"世界上最遥远的距离，诗句，作者说法较多，一说出自张小娴的小说《荷包里的单人床》，另一说出自印度著名诗人泰戈尔诗集《飞鸟集》，但《飞鸟集》中并未收录近似诗句，大抵是因为其中一个版本最后一句中有“世界上最遥远的距离是飞鸟与鱼的距离”，被一些人认为是泰戈尔所创作，但到目前为止没有客观证据说明泰戈尔创作过类似诗句。原句为：“世界上最遥远的距离，不是生与死的距离，不是天各一方，而是，我就站在你的面前，你却不知道我爱你”，该句可在张小娴作品《荷包里的单人床》中找到。“世界上最遥远的距离”此句诗现在版本较多，多为网友创作。"},
        {id:3,nickname:"张三",createTime:"2018-01-23",content:"世界上最遥远的距离，诗句，作者说法较多，一说出自张小娴的小说《荷包里的单人床》，另一说出自印度著名诗人泰戈尔诗集《飞鸟集》，但《飞鸟集》中并未收录近似诗句，大抵是因为其中一个版本最后一句中有“世界上最遥远的距离是飞鸟与鱼的距离”，被一些人认为是泰戈尔所创作，但到目前为止没有客观证据说明泰戈尔创作过类似诗句。原句为：“世界上最遥远的距离，不是生与死的距离，不是天各一方，而是，我就站在你的面前，你却不知道我爱你”，该句可在张小娴作品《荷包里的单人床》中找到。“世界上最遥远的距离”此句诗现在版本较多，多为网友创作。"},
        {id:4,nickname:"张三",createTime:"2018-01-23",content:"世界上最遥远的距离，诗句，作者说法较多，一说出自张小娴的小说《荷包里的单人床》，另一说出自印度著名诗人泰戈尔诗集《飞鸟集》，但《飞鸟集》中并未收录近似诗句，大抵是因为其中一个版本最后一句中有“世界上最遥远的距离是飞鸟与鱼的距离”，被一些人认为是泰戈尔所创作，但到目前为止没有客观证据说明泰戈尔创作过类似诗句。原句为：“世界上最遥远的距离，不是生与死的距离，不是天各一方，而是，我就站在你的面前，你却不知道我爱你”，该句可在张小娴作品《荷包里的单人床》中找到。“世界上最遥远的距离”此句诗现在版本较多，多为网友创作。"},
      ] ,                    //评论列表
      imgsrc:"",                 //验证码
      pageNum:1,                 //当前在第几页
      pageSize:5 ,                     //每页显示多少条
      total:null                               //总共多少条
    }
  },
  components:{
    liearnav,
    minNav,
    comBtn,
    answerBox
  },
  methods:{

    /*
      获取验证码
     */
      getImg(){
        $(".img").attr("src"," http://192.168.20.50:8086/yuxinfang/binary/getVerificationCode?date="+new Date().getTime())
      },


    /*
      分页改变
     */
    handleCurrentChange(val){
         this.  getAnswer(val,5)
    },



/*
  注销登录
 */
    backlogin(){

    },
    /*
       获取数据
     */
    getAnswer(num,size){
      //  获取社区详情
      this.$axios.get('/anonymous/getArticleMsg',{
        params:{articleId:this.id,pageNum:num,pageSize:size, orderBy:"create_time desc"}
      }).then((resp) => {
        console.log(resp)
        this.anser=resp.data.data.comments.list;
        this.pageNum=resp.data.data.comments.pageNum;
        this.pageSize=resp.data.data.comments.pageSize;
        this.total=resp.data.data.comments.total
        this.title=resp.data.data.title
      });

    },



    /*
       点击二级菜单 返回页面
     */

    linkTo(link){
      this.$router.push(link);
    },
    goback(){
      this.$router.go(-1)
    },

    /*
     点击提问，弹框出现
     */
    requise(){
       this.isShow=true;
       this.myShow=true;

    },

    /*
获取焦点，清空值
 */
    backPlace(){
      this.placehoder="";
    },

    /*
      点击回答
     */
    sendAnser(){

      console.log(this.answer)
      console.log(this.id)
      console.log(this.imgsrc)
      if( this.answer==""||this.answer=="写答案..."){
        this.$message({
          message: '请先输入您的答案',
          type: 'warning',
          duration:1500
        });
        return  false;
      }




      /*
      ================假数据回答========================
       */
// else {
//         this.$message({
//           message: '回答成功',
//           type: 'success',
//           duration:1500
//         });
//
//         var  todayDate=new Date();
//         var   date = todayDate.getDate();
//         var   month= todayDate.getMonth() +1;
//         var   year= todayDate.getFullYear();
//
//         var a={
//              id: this.anser.length+1,
//              createTime:year+"-"+month+"-"+date,
//              content:this.answer,
//               nickname:"李四"
//         }
//         this.anser.unshift(a)
//       }








      //验证码

      if( this.imgsrc==""){
        this.$message({
          message: '验证码不能为空',
          type: 'warning',
          duration:1500
        });
        return  false;
      }



      //获取数据传给后台
      this.$axios.post('/authc/community/publishComment',{
        content:this.answer,
        articleId:this.id,
        validCode:this.imgsrc,
        validFlag:0
      }).then((resp) => {
        if(resp.data.code==0){
          this.$message({
            message: '回答成功',
            type: 'success',
            duration:1500
          });
          this. getAnswer(1,5)
          this.imgsrc="",
            this.answer="写答案..."
          this. getImg();
        }else {
          this.imgsrc="",
            this.answer="写答案..."
          this. getImg();
          console.log(resp)
          this.$message({
            message:resp.data.msg,
            type: 'warning',
            duration:1500
          });
        }
      });



    },


    /*
      点击提交问题
     */
    sendRequise(){
         if(this.placehoder==""||this.placehoder=="请输入您要问的问题"){
           this.$message({
             message: '请先输入您要问的问题',
             type: 'warning',
             duration:1500
           });
           return  false;
         }




      //   =============假数据===================

      // else {
      //      this.$message({
      //        message: '问题提交成功',
      //        type: 'success',
      //        duration:1500
      //      });
      //      this.isShow=false;
      //      this.myShow=false;
      //    }



      //获取数据传给后台
      this.$axios.post('/authc/community/publishArticle',{
        title:this.placehoder,
        content:"123"
      }).then((resp) => {
        this.isShow=false;
        this.myShow=false;
        if(resp.data.code==0){
          this.$message({
            message: '问题提交成功',
            type: 'success',
            duration:1500
          });
          this.$router.go(-1)
        }else {
          this.$message({
            message:resp.data.msg,
            type: 'warning',
            duration:1500
          });
        }
      });
    },


    /*
      点击关闭
     */
    close(){
      this.isShow=false;
      this.myShow=false;
    },


    /*
    获取焦点，清空值
     */
    backPlacetop(){
      this.answer="";
    },


  },
  mounted(){
    this.id = this.$route.query.id;
    this. getAnswer(1,5);
    this.getImg()
  }
}
