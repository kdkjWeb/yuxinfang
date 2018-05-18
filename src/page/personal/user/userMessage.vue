<template>
      <div  class="message">
               <div class="message-title">
                   <p>我的账户：<span class="totalPrice">{{bannas*100}}</span></p>
                   <p>商家等级：<span  class="thisPrice">金牌</span></p>
               </div>
        <div  class="monny">
              <p>总资产(元)：<span class="totalPrice">{{totalMony.totalAsset*100}}</span></p>
              <p>累计收益(元)：<span class="totalPrice">{{totalMony.totalEarnings*100}}</span></p>
              <p>本月收益(元)：<span class="totalPrice">{{totalMony.monthEarnings*100}}</span></p>
        </div>
        <!--<p  class="buttomTitle">账户管理费(元)：<span  class="thisPrice">123456</span></p>-->
      <div class="table">
        <ul>
          <li  @click="show(0)"   :class="activeIndex==0?'bround':''">余额明细</li>
          <li  @click="show(1)"   :class="activeIndex==1?'bround':''">充值明细</li>
          <li  @click="show(2)"   :class="activeIndex==2?'bround':''">收益明细</li>
          <li  @click="show(3)"   :class="activeIndex==3?'bround':''">提现明细</li>
          <li  @click="show(4)"   :class="activeIndex==4?'bround':''">转账明细</li>
          <li  @click="show(5)"   :class="activeIndex==5?'bround':''">购物明细</li>
        </ul>
      </div>
        <!--余额明细-->
        <keep-alive>
             <el-table  v-if=" 0 ==activeIndex"
          :data="cartProducts"
          border
          style="width:80%;margin:5%  auto;margin-left: 10%"
          empty-text="数据暂时为空"
        >

          <el-table-column
            prop="times"
            label="时间"
            align="center"
            height="200"
            width="200">
          </el-table-column>
          <el-table-column
            prop="typeName"
            label="类型"
            align="center">

          </el-table-column>
          <el-table-column
            prop="amount"
            label="金额(元)"
            cell-class-name
            align="center">
          </el-table-column>
          <el-table-column
            prop="kinMony"
            label="金额(金币)"
            align="center"
            width="200">
          </el-table-column>

        </el-table>
        </keep-alive>


        <!--充值明细-->
        <keep-alive>
             <el-table   v-if=" 1 ==activeIndex"
          :data="cartProducts"
          border
          style="width:50%;margin:5%  auto;margin-left:10%;"
          empty-text="数据暂时为空"
        >

          <el-table-column
            prop="times"
            label="时间"
            align="center"
            height="200"
            width="200">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="金额(元)"
            cell-class-name
            align="center">
          </el-table-column>


        </el-table>
        </keep-alive>


        <!--收益明细-->
        <keep-alive>
                <el-table  v-if=" 2 ==activeIndex"
          :data="cartProducts"
          border
          style="width:70%;margin:5%  auto;margin-left:10%;"
          empty-text="数据暂时为空"
        >

          <el-table-column
            prop="times"
            label="时间"
            align="center"
            height="200"
            width="200">
          </el-table-column>
          <el-table-column
            prop="typeName"
            label="类型"
            align="center">

          </el-table-column>
          <el-table-column
            prop="amount"
            label="金额(元)"
            cell-class-name
            align="center">
          </el-table-column>


        </el-table>
        </keep-alive>
        <!--提现明细-->

        <keep-alive>
             <el-table   v-if="3 ==activeIndex"
          :data="cartProducts"
          border
          style="width:50%;margin:5%  auto;margin-left:10%;"
          empty-text="数据暂时为空"
        >

          <el-table-column
            prop="times"
            label="时间"
            align="center"
            height="200"
            width="200">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="金额(元)"
            cell-class-name
            align="center">
          </el-table-column>


        </el-table>
        </keep-alive>
        <!--转账明细-->

        <keep-alive>
               <el-table   v-if="4 ==activeIndex"
          :data="cartProducts"
          border
          style="width:70%;margin:5%  auto;margin-left:10%;"
          empty-text="数据暂时为空"
        >

          <el-table-column
            prop="times"
            label="时间"
            align="center"
            height="200"
            width="200">
          </el-table-column>
          <el-table-column
            prop="typeName"
            label="类型"
            align="center">

          </el-table-column>
          <el-table-column
            prop="amount"
            label="金额(元)"
            cell-class-name
            align="center">
          </el-table-column>


        </el-table>
        </keep-alive>
        <!--购物明细-->

        <keep-alive>
                 <el-table    v-if="5 ==activeIndex"
          :data="cartProducts"
          border
          style="width:50%;margin:5%  auto;margin-left:10%;"
          empty-text="数据暂时为空"
        >

          <el-table-column
            prop="times"
            label="时间"
            align="center"
            height="200"
            width="200">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="金额(元)"
            cell-class-name
            align="center">
          </el-table-column>


        </el-table>
        </keep-alive>
      </div>
</template>

<script>
 export  default  require("./userMeCtr")
</script>

<style scoped>

  .table{
    width:80%;
    text-align: left;
    border: 1px solid gainsboro;
    border-radius: 20px;
    font-size: 15px;
    margin:3% auto;
    overflow: hidden;
  }
  .table ul{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  li{
    list-style: none;
    height: 100%;
    text-align: center;
    width: 30%;
    border-right: 1px solid red;
    padding: 0.6%  0;
    /*margin: 0;*/
  }
  .table li:last-child{
    border:none;
  }
  *{
    font-size: 14px;
  }
  .buttomTitle{
    border-bottom: 1px solid gainsboro;
    width: 100%;
    padding-bottom:2%;
    margin-top: -3%;
  }
.message-title{
  width: 100%;
  text-align: left;

  padding: 15px  0;
  padding-left: 5%;
  /*display: flex;*/
  /*justify-content: space-between;*/
  border-bottom: 1px solid gainsboro;
}
  .message-title  p{
    display: inline-block;
    margin-right: 10%;
  }
  .monny{
    width: 90%;
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap;
   /*border: 1px  solid red;*/
    margin: 3% auto;
  }
.monny p{
  display: inline-block;
  width: 30%;
  text-align: left;
  text-indent: 1em;
  border-radius: 5px;
  padding: 1% 0;
  margin-bottom: 3%;
  border: 1px solid rgb(59,149,44) ;
}
.totalPrice{
  color: red;
}
.bround{
  background-color: red;
  color: white;
}
.thisPrice{
  color: rgb(253,136,0);
}
</style>
