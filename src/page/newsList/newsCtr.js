// import  topnav  from  "@/components/common/nav"
import  liearnav  from '@/components/common/liearnav'
import  minNav  from '@/components/common/minNav'
import  textList  from '@/components/common/textList'
// import  sfooter  from '@/components/common/footer'
import  comBtn  from '@/components/common/btn'
export default {
  name: "newsList",
  data(){
    return{
      type:"",
      title:"",
      placehoder:"请输入您要问的问题" ,  //问题；
      isShow:false,
      myShow:false,
      textTist:"",           //文章列表
      pageNum:1,                 //当前在第几页
      pageSize:5 ,                     //每页显示多少条
      total:100 ,                                //总共多少条
      // textTist:[
      //   {title:"为什么现在用支付宝得人比用微信得人少？",createTime:"2018-24-35",id:1},
      //   {title:"为什么现在用支付宝得人比用微信得人少？",createTime:"2018-24-35",id:2},
      //   {title:"为什么现在用支付宝得人比用微信得人少？",createTime:"2018-24-35",id:3},
      //   {title:"为什么现在用支付宝得人比用微信得人少？",createTime:"2018-24-35",id:4},
      //   {title:"为什么现在用支付宝得人比用微信得人少？",createTime:"2018-24-35",id:5},
      //   {title:"为什么现在用支付宝得人比用微信得人少？",createTime:"2018-24-35",id:6},
      // ]
    }
  },
  components:{
    liearnav,
    minNav,
    textList,
    comBtn
  },
  methods:{
    linkTo(link){
      this.$router.push(link);
    },


    getList(Num,Size){
       this.pageNum=Num;
       //  公告列表
       this.$axios.post('/anonymous/getSysNoticeList',{
         pageNum:Num,pageSize:Size
       }).then((resp) => {
         console.log(resp.data.data.list,"公告")
         if( this.type==1){
           this.textTist=resp.data.data.list;
           this.pageSize=resp.data.data.pageSize;
           this.total=resp.data.data.total;
           this.title = "公告";
         }
       });

       //  社区列表
       this.$axios.post('/anonymous/getArticleList',{
         pageNum:Num,pageSize:Size,orderBy:"create_time desc"
       }).then((resp) => {
         console.log(resp.data.data.list,"社区");
         if( this.type==2){
           this.textTist=resp.data.data.list;
           this.pageSize=resp.data.data.pageSize;
           this.total=resp.data.data.total;
           this.title = "社区";
         }
       });
     },
    /*
 点击提问，弹框出现
 */
    requise(){
      this.isShow=true;
      this.myShow=true;


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


/*
  ==================================假数据========================================
 */

//       else {
//
//         this.isShow=false;
//         this.myShow=false;
//         this.$message({
//           message: '问题提交成功',
//           type: 'success',
//           duration:1500
//         });
//
//         var  todayDate=new Date();
//         var   date = todayDate.getDate();
//         var   month= todayDate.getMonth() +1;
//         var   year= todayDate.getFullYear();
//        if(month<10){
//   month=0+""+month
// }
//         var a={
//           id: this.textTist.length+1,
//           createTime:year+"-"+month+"-"+date,
//           title:this.placehoder,
//           nickname:"李四"
//         }
//         this.textTist.unshift(a)
//
//       }


      //获取问题标题传给后台
      this.$axios.post('/authc/community/publishArticle',{
          title:this.placehoder,
          content:""
      }).then((resp) => {
        this.isShow=false;
        this.myShow=false;
        if(resp.data.code==0){
          this.$message({
            message: '问题提交成功',
            type: 'success',
            duration:1500
          });
          this.getList(1,5)
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
    backPlace(){
      this.placehoder="";
    },
    linkgo(item){
        console.log(item,"id");
        if(this.type==1){

          this.$router.push('noticeDetail?id='+item);
        }
      if(this.type==2){
          this.$router.push('cmnDetail?id='+item);
        }
    },

    /**
     * 获取分页
     * @param val
     */

    handleCurrentChange(val) {
      this.getList(val,5)
    }

  },

  mounted(){
    this.type = this.$route.query.type;
    this.getList(1,5);

    /*
    假的标题
     */
    // if(this.type==1){
    //   this.title="公告"
    // }
    // if(this.type==2){
    //   this.title="社区"
    // }
  }

}
