<template>
    <div id="tree">
      <ul  class="child">
        <li   contenteditable="true"  v-for="item  in  list"  :key="item.id">
          {{item.title}}
          <!--<i class="el-icon-edit"></i>-->
          <i class="el-icon-delete"  @click="dele(item.id,1)"></i>
          <i class="el-icon-circle-plus-outline"  @click="add(item.id,1)"></i>
          <ul  v-for="items  in  item.smallTitle">
              <li>
                {{items.title}}
                <i class="el-icon-delete"  @click="dele(items.sid,2)"></i>
                <i class="el-icon-circle-plus-outline"  @click="add(items.sid,2)"></i>
              </li>
          </ul>
        </li>


      </ul>
    </div>
</template>

<script>
    export default {
        name: "tree",
      data(){
          return{
             list:[
               {title:"每日推荐",id:1},
               {title:"生鲜食品",smallTitle:[{
                   title:"水果", sid:1

                 },
                   {
                     title:"肉类",sid:2
                   }

                 ],id:2},
               {title:"蔬菜",smallTitle:[{
                   title:"青菜",sid:1

                 },
                   {
                     title:"莴笋",sid:2
                   }


                 ],id:3},
             ]
          }
      },
      methods:{
        // enter(val){
        //    // console.log(val,"大类id")
        // },
        // enters(val){
        //   console.log(val,"小类id")
        // }
        dele(val,type){
          console.log(val,"删除id")
          console.log(type,"删除类型")
        },
        add(val){
          console.log(val,"添加id");
          $(this).after('')
        }
      }
    }
</script>

<style scoped>
  i{
    color: red;
  }
  .child{
    font-size: 15px;
  }
.child  ul  li{
   font-size: 10px;
}

li{
  max-width: 100px;
}
/*.child  ul li:before{*/
  /*content: "  ";*/
  /*width: 50px;*/
  /*display: block;*/
  /*border: 1px solid red;*/

/*}*/
</style>
