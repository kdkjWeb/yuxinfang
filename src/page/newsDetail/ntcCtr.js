// import  topnav  from  "@/components/common/nav"
import  liearnav  from '@/components/common/liearnav'
import  minNav  from '@/components/common/minNav'
// import  sfooter  from '@/components/common/footer'
export default {
  name: "noticeDetail",
  data(){
    return{
      title:"",
      id:"",
      textList:""                           //数据列表
    }

  },
  components: {
    liearnav,
    minNav,
  },
  mounted(){
    this.id = this.$route.query.id;


    //  公告详情
    this.$axios.get('/anonymous/getSysNoticeMsg',{
      params:{articleId:this.id}
    }).then((resp) => {
      console.log(resp.data.data,"公告详情")
      this.textList=resp.data.data;
      this.title=resp.data.data.title
    });

  },
  methods:{
    backindex(){

    },
    linkTo(link){
      this.$router.push(link);
    },
    goback(){
      this.$router.go(-1)
    }
  }
}
