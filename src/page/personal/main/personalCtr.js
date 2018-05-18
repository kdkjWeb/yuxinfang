// import  topnav  from '@/components/common/nav'
import  comBtn  from '@/components/common/btn'
import  shopList  from '@/components/common/shopList'
import {mapGetters} from 'vuex'
export default {
  name: "personal",
  components:{
    comBtn,
    shopList,
    istrue:false
  },
  data: function () {
    return {
      istrue: 0,
      roleId:null,
      leftIndex:0,          //左道航下标
      cartProducts: [
        {img: "./assets/image/1.png", name: "台湾正宗猕猴桃", parice: "￥12", id: 1},
        {img: "../../assets/image/1.png", name: "台湾正宗猕猴桃台湾正宗猕猴桃", parice: "￥12", id: 2},
        {img: "../assets/image/1.png", name: "台湾正宗猕猴桃", parice: "￥12", id: 3},
      ]
    }
  },
  methods: {
    link(index){


      this.leftIndex=index;
      switch (index) {
        case 0:
          this.$router.push({
            path: "/user/tocart"
          });
          break;
        case 1:
          this.$router.push({
            path: "/user/goodeList"
          });
          break;
        case 2:
          this.$router.push({
            path: "/user/message"
          });
          break;
        case 3:
          this.$router.push({
            path: "/user/setmony"
          });
          break;
        case 4:
          this.$router.push({
            path: "/user/sengmony"
          });
          break;
        case 5:
          this.$router.push({
            path: "/user/getmony"
          });
          break;
        case 6:
          this.$router.push({
            path: "/user/userCMS"
          });
          break;
        case 7:
          this.$router.push({
            path: "/user/business"
          });
          break;
      }
    },
    cheack(e){
      var circle=e.currentTarget;
      circle.style.border="1px solid red";

    },
  },
  mounted(){

    this.roleId= sessionStorage.roleId;

    this.$router.push('/user/tocart')
  },

}
