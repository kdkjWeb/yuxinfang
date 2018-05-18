// import  topnav  from  "@/components/common/nav"
// import  sfooter  from '@/components/common/footer'
import  comBtn  from '@/components/common/btn'
import  liearnav  from '@/components/common/liearnav'
export default {
  name: "check",
  components:{
    comBtn,
    liearnav
  },
  data(){
      return{
        demoEvents: [ ]
      }
  },
  methods:{
    month(val){
      console.log(val)
    },
    daych(val){
      console.log(val)
      var  myeven={
          date:val.date,
        title: '签到成功',
        desc: '您将获得1800金币!'
      }
      this.demoEvents.push(myeven)
    },
    checkOver(){

      this.$axios.post('/authc/sign/addSignRecord').then((resp)=>{
          console.log(resp)
        if(resp.data.code==0){
          if(this.demoEvents.length==0){
            var  mydate=new Date()
            console.log(mydate.toLocaleDateString())
            var  myeven={
              date:mydate.toLocaleDateString(),
              title: '签到成功',
              desc: '您将获得1800金币!'
            }
            this.demoEvents.push(myeven)
          }
        }else {
          this.$message({
            message: resp.data.msg,
            type: 'warning',
            duration:1500
          });
          return false;
        }
      });
    },
    getHistory(){
       this.$axios.get('/authc/sign/getSignRecord').then((resp)=>{
          console.log(resp)
          console.log(resp.data.data.record)
       })
    }

  },
  mounted(){
      this. getHistory()
  }


}
