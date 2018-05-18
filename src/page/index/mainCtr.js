
import  liearnav  from '@/components/common/liearnav'
import  hotProduct  from '@/components/common/hotProduct'
import  newsBox  from '@/components/common/newsBox'
export default {
  name: "mainIndex",
  components:{
    liearnav,
    hotProduct,
    newsBox,
  },
  data(){
    return{
      opashow:false,                  //二级菜单是否显示
      textTist:[

      ],
      proimg:[

      ],
      bottomimg:[

      ],                    //下面四张图片数据
      goodsType:"",                       //商品大类
      smallgoods:"" ,                      //商品小类
      noticeList:"",
      articleList:[

      ],                                //社区列表
      smallList:false                     //小类
    }
  },
  methods:{
    linkTo(link){
      this.$router.push(link);
    },
    addCar(item){
      localStorage.proId++;
      this.$store.commit('addScore', localStorage.proId)
      console.log(item,"加入购物车id")
    },
    /*
    二级菜单 显示
     */
    opaShow(){
      this.opashow=true
    },
    selfShow(){
      this.opashow=true
    },
    /*
二级菜单 隐藏
 */
    opahide(){
      this.opashow=false
    },
    selfhide(){
      this.opashow=false
    }

  },
  mounted(){

    //商品种类
    this.$axios.get('/anonymous/queryAllGoodsType').then((resp) => {
      var arr =resp.data.data;
      arr=arr.slice(0,3)
      this.goodsType=arr;
      arr.forEach((e,index)=>{
        console.log( arr[index].lowerGoodsType)
        if(arr[index].lowerGoodsType==undefined){
          arr[index].lowerGoodsType="";
          this.smallList=false;
        }else {
          // arr[index].lowerGoodsType=arr[index].lowerGoodsType.slice(0,2);
          // this.smallList=true;
        }
      });
    });


    //  公告列表
    this.$axios.post('/anonymous/getSysNoticeList',{
      pageNum:1,pageSize:5
    }).then((resp) => {
      // console.log(resp.data.data.list,"公告");
      this.noticeList=resp.data.data.list;

    });

    //  社区列表
    this.$axios.post('/anonymous/getArticleList',{
      pageNum:1,pageSize:5
    }).then((resp) => {
      this.articleList=resp.data.data.list;
    });


    //商品展示列表
    this.$axios.get('/anonymous/queryGoodsList',{
      params:{ pageNum:1,pageSize:10}
    }).then((resp) => {
      this.proimg=resp.data.data.list.slice(0,6);
      this.bottomimg=resp.data.data.list.slice(6,10);
    });
  }
}
