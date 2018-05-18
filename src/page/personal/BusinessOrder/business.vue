<script src="businessCtr.js"></script>
<template>
    <div id="business">

      <!--头部搜索-->
          <div  v-if="roleId==3?true:false">
                <div  class="topSearch">
                  <input type="text"  placeholder="请输入商家名称"  v-model="bisName">
                  <comBtn btnClass="fred" btnText="查询" @click.native="search"></comBtn>
                </div>
          </div>

      <!--商家列表-->
       <el-table
         v-if="roleId==3?true:false"
        :data="cartProducts"
        border
        highlight-current-row
        ref="singleTable"
        style="width:98%;margin: 3% 1%"
         @cell-click="getCoun"
        empty-text="暂时没有数据"
      >
        <el-table-column
          type="index"
          width="35">
        </el-table-column>
        <el-table-column
          prop="shopName"
          label="商家名称"
          width="150"
          cell-class-name
          align="center">
        </el-table-column>
        <el-table-column
          prop="realName"
          label="姓名"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="110"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="bankCard"
          label="银行卡号"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="alipayAccount"
          label="支付宝账号"
          width="110"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间"
          width="110"
          align="center"
        >
        </el-table-column>
      </el-table>


      <!--分页-->
      <el-pagination
        @current-change="thandleCurrentChange"
        :current-page.sync="tpageNum"
        :background=true
        :page-size="tpageSize"
        style="margin: 3%  0"
        layout="prev, pager, next,total"
        v-if="roleId==3?true:false"
        :total="ttotal">
      </el-pagination>




      <!--下面列表-->

      <div  class="btmPro">
        <!--状态按钮-->
            <div class="bottom-btn">
          <comBtn btnClass="fged2" btnText="已付款" @click.native="getStadus(0)"></comBtn>
          <comBtn btnClass="fged2" btnText="申请退货" @click.native="getStadus(1)"></comBtn>
          <comBtn btnClass="fged2" btnText="已退货" @click.native="getStadus(2)"></comBtn>
          <comBtn btnClass="fged2" btnText="修改备注" @click.native="getStadus(3)"></comBtn>
          <comBtn btnClass="fged2" btnText="导出Excal" @click.native="updaPer"></comBtn>
          <comBtn btnClass="fged2" btnText="审核" @click.native="updaPer"></comBtn>
        </div>

        <!--底部搜索商品-->
        <div  class=" bottomSearch ">
          <p>
            商品名:
                 <input type="text"  placeholder="请输入商品名"  class="proname"  v-model="proName">
          </p>
       <p>
          交易时间:
              <input type="date"  placeholder="起始时间"   v-model="starTime">-
              <input type="date"  placeholder="终止时间"  v-model="endTime">
       </p>
          <comBtn btnClass="fred" btnText="查询" @click.native="searchPro"></comBtn>
        </div>

        <!--底部列表-->
        <el-table
          :data="proList"
          border
          style="width:98%;margin: 3% 1%"
          empty-text="暂时没有数据"
        >

          <el-table-column
            prop="orderNumber"
            label="订单号"
            cell-class-name
            width="150"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品名"
            align="left"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="dan"
            label="单位"
            width="50"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="totalPrice"
            label="价格"
            width="60"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="num"
            label="数量"
            width="50"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="sprice"
            label="市场价"
            width="70"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="50"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="交易时间"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="bei"
            label="备注"
            width="130"
            align="left"
          >
          </el-table-column>
        </el-table>

        <!--分页-->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :background=true
          :page-size="pageSize"
          style="margin: 3%"
          layout="prev, pager, next,total"
          :total="total">
        </el-pagination>

      </div>




    </div>
</template>

<script>
export  default   require("./businessCtr")
</script>

<style scoped>


  /*
  头部搜索
   */
.topSearch{
  width: 30%;
  display: flex;
  margin: 2% 1%;
  justify-content: space-between;
}
  .topSearch  input{
    width: 60%;
    text-indent: 5px;
  }
  /*
状态按钮
*/
  .bottom-btn{
    width:70%;
    display: flex;
    justify-content: space-between;
    margin:   1%;
  }

  /*
  下面产品列表
  */
  .btmPro{
    width: 100%;
  }
  .bottomSearch{
    width:90%;
    /*border: 1px solid red;*/
    display: flex;
    margin:2% 1%;
    justify-content: start;
  }
  .bottomSearch  p{
    padding: 0;
    margin: 0;
    width: auto;
    text-align: left;
    /*border: 1px solid red;*/
  }
  .bottomSearch  p:nth-of-type(1){
    width: 30%;
  }
  .bottomSearch  p:nth-of-type(1)  input{
    width: 60%;
  }
  .bottomSearch  input{
    width:35%;
  }
  .bottomSearch  .proname{
    width: 35%;
  }
</style>
