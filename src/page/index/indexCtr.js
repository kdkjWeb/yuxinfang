
import  sfooter  from '@/components/common/footer'
import {mapGetters} from 'vuex'
export default {
  name: 'topnav',
  components: {
    sfooter
  },
  props: [],
  data() {
    return {
      sessionType: true,
      username: "",
      activeIndex:""
    }
  },
  methods: {

    /*
    退出登录
     */
    backlogin() {
      this.$confirm('您是否确定要退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false
      }).then(() => {
        this.$axios.post('/anonymous/logout', {}).then((resp) => {
          console.log(resp);
          if (resp.data.code == 0) {
            sessionStorage.token = "";
            sessionStorage.realName = "";
            sessionStorage.phone = "";
            sessionStorage.nickname = "";
            sessionStorage.type = "";

            this.$router.push("login")

            this.$store.commit('backLogin')

            this.sessionType = true;
            this.username = "",

              this.$message({
                message: '您已退出登录',
                type: 'success',
                duration: 1500
              });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });
      });
    },
    linkTo(link,index) {
      this.activeIndex=index;
      this.$router.push(link);
    },
    linkTop(link,index){
      this.activeIndex=index;
     console.log(this.islogin)
      // this.$router.push(link);
      if( this.islogin.realName==""||this.islogin.realName==undefined){
        this.$message({
          message: '请先登录',
          type: 'warning',
          duration:1500
        });
        var  that=this;
        setTimeout(function () {
          that.$router.push({
              path:"/login"
          });
        },1000)
      }else {
        this.$router.push(link);
      }
    }
  },
  mounted() {
    console.log(sessionStorage.realName,"用户名")
    if (sessionStorage.realName) {
      this.username = sessionStorage.realName;
      this.sessionType = false;
    } else {
      this.username = "",
        this.sessionType = true
    }

  },
  computed: {
    ...mapGetters({
      islogin: 'getStadus'
    }),

  },
}
