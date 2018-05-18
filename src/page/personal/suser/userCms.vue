<!--<script src="userCmsCtr.js"></script>-->
<template>
  <div class="usercms">

    <!--上面商家显示-->
    <div v-show="topcont">
      <div class="conten">
        <div class="redBtn" v-show="userType==1?true:false"      v-if="roleId==3?true:false">
          <ul>
            <li @click="show(0)" :class="activeIndex==0?'hover':''">正常商家</li>
            <li @click="show(1)" :class="activeIndex==1?'hover':''">待审核商家</li>
            <li @click="show(2)" :class="activeIndex==2?'hover':''">暂停商家</li>
          </ul>
        </div>
        <div class="topBtn">
          <comBtn btnClass="fged" btnText="查看营业执照" @click.native.stop="showyimg"></comBtn>
          <comBtn btnClass="fged"  :btnText="btnTexts" class="gfged" @click.native="handle"   v-if="roleId==3?true:false"></comBtn>
        </div>

        <!--商户数据显示-->
        <el-table
          :data="cartProducts"
          border
          highlight-current-row
          ref="singleTable"
          style="width:100%;"
          empty-text="暂时没有数据"
          @cell-click="getCoun"
        >
          <el-table-column
            type="index"
            width="50">
          </el-table-column>

          <el-table-column
            prop="shopName"
            label="商家名称"
            width="110"
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
            prop="alipayAccount"
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


      </div>

      <div class="conten">

        <!--下面显示按钮-->
        <div class="bottom">
          <div class="bottom-btn">
            <comBtn btnClass="fged2" btnText="新增" @click.native="addPer"></comBtn>
            <comBtn btnClass="fged2" btnText="删除" @click.native="delePer"></comBtn>
            <comBtn btnClass="fged2" btnText="修改" @click.native="updaPer"></comBtn>
            <comBtn btnClass="fged2" btnText="优惠券" @click.native="yhjPer"></comBtn>
            <p class="search">
              <input type="text" placeholder="请输入商品名" v-model="searchtest">
              <comBtn btnClass="fred" btnText="查询" @click.native="search"></comBtn>
            </p>
          </div>
        </div>
        <div class="bottom-content">


          <!--树型结构-->
          <div class="leftPro"  id="tree">
            <!--固定显示部分-->
            <p   v-if="  roleId==3?true:false">
              <a href="#">商品分类</a>
                <i class="el-icon-circle-plus-outline  icon"  @click="addP"></i>
            </p>
            <!--下面列表-->
            <ul  v-if="  roleId==2?true:false" >
              <!--一级大类-->
                  <li  v-for="(item,index)  in treeNodes"  :key="item.id"   @click="showSmallTree(index)">
                    <a href="#"    @click="getD(item.id,$event)"   class="redC">{{item.typeName}}</a>
                    <!--<i class="el-icon-circle-plus-outline  icon"  @click="addC(item.id,index)" ></i>-->
                    <!--<i class="el-icon-remove-outline  icon"  @click="deleC(item.id,index)"></i>-->
                    <ul  v-show="smallTree==index?true:false">
                      <!--二级小类-->
                         <li  v-for="(items,index)  in item.lowerGoodsType"  :key="items.id">
                                  <a href="#"   @click="getD(items.id,$event)"  class="redC" >{{items.typeName}}</a>
                                 <!--<i class="el-icon-remove-outline  icon"  @click="deleS(items.id,index)"></i>-->
                         </li>
                    </ul>
                  </li>
            </ul>



            <ul   v-if="  roleId==3?true:false"    :class="roleId==3?'bor':' '  ">
              <!--一级大类-->
              <li  v-for="(item,index)  in treeNodes"  :key="item.id"  @click="showSmallTree(index)">
                <a href="#"  contenteditable  @blur="updateC(item.id, $event)"   @click="getD(item.id,$event)"  class="redC">{{item.typeName}}</a>
                <i class="el-icon-circle-plus-outline  icon"  @click="addC(item.id,index)"  ></i>
                <i class="el-icon-remove-outline  icon"  @click="deleC(item.id,index)"></i>
                <ul  v-show="smallTree==index?true:false">
                  <!--二级小类-->
                  <li  v-for="(items,sindex)  in item.lowerGoodsType"  :key="items.id">
                    <a href="#"  contenteditable  @blur="updateS(item.id,items.id, $event)"    @click="getD(item.id,$event)"  class="redC">{{items.typeName}}</a>
                    <i class="el-icon-remove-outline  icon"  @click="deleS(items.id,sindex,index)"></i>
                  </li>

                </ul>
              </li>
            </ul>
          </div>

          <!--下面产品显示-->
          <div  style="width: 72%;">
               <el-table
                 @current-change="bhandleCurrentChange"
              :data="proDetailList"
              border
              highlight-current-row
              ref="singleTable"
              height="290"
              @cell-click="selected"
              style="margin-right: 15px"
              empty-text="数据暂时为空"
            >
              <el-table-column
                type="index"
                width="32">
              </el-table-column>
              <el-table-column

                prop="goodsName"
                label="商品名"
                width="148"
                cell-class-name
                align="center">
              </el-table-column>
              <el-table-column
                prop="units"
                label="单位"
                width="50"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="realPrice"
                label="优惠价"
                width="130"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="oldPrice"
                label="市场价"
                width="130"
                align="center"
              >
              </el-table-column>

            </el-table>

            <!--分页-->
                <el-pagination
              @current-change="bhandleCurrentChange"
              :current-page.sync="bpageNum"
              :background=true
              :page-size="bpageSize"
              style="margin-top:6%;margin-bottom: 3%"
              layout="prev, pager, next,total"
              :total="btotal">
            </el-pagination>

          </div>

        </div>

      </div>
    </div>


    <!--新增修改页面-->
    <div id="addPer" v-show="addStart">
      <p class="addPer-title">商品名称</p>
      <div class="addPerClass">
        <p>名称：<input type="text" placeholder="输入名称" class="proname" v-model="addPro.addName"></p>
        <p>单位：<input type="text" v-model="addPro.units"   placeholder="/件"></p>
        <p>优惠价：<input type="text" placeholder="￥0" v-model="addPro.yprice"></p>
        <p>市场价：<input type="text" placeholder="￥0" v-model="addPro.sprice"></p>

      </div>

      <!--商品照片展示-->
      <div class="imgShow">
        <img :src="addPro.imgsrc" alt="">
      </div>

      <div class="addPer-btn">
        <p class="fileimg"><input type="file" @change="imgfile" id="file">上传图片</p>
        <comBtn btnClass="fged2" btnText="保存" @click.native="getContent"></comBtn>
        <comBtn btnClass="fged2" btnText="返回" @click.native="closeAdd"></comBtn>
        <select name=""  v-model="addPro.proClasss"  >
          <option value="0">--选择商品类型--</option>
          <option  :value="item.id"  v-for="item in proClass">{{item.salesTypeName}}</option>
        </select>
      </div>

      <p class=" prodetail">商品详情</p>

      <div id="editorElem"  :class="{zdex:iszzc}" ></div>
    </div>


    <!--营业执照显示区-->
    <div class="yyphoto" v-show="yimgShow" @click="closeyimg">
      <img src="" alt="营业执照">

    </div>

    <!--优惠券页面-->
    <div class="yhjHtml" v-show="yhArr.yhshow">
      <p class="yhjHtml-title">优惠券</p>
      <div class="addPer-btn">
        <comBtn btnClass="fged2" btnText="增加" @click.native="open5"></comBtn>
        <comBtn btnClass="fged2" btnText="删除" @click.native="handleDelete"  class="mybtn"></comBtn>
        <comBtn btnClass="fged2" btnText="编辑" @click.native="updateY"   class="mybtn"></comBtn>
        <comBtn btnClass="fged2" btnText="返回" @click.native="closeAdd"></comBtn>
      </div>
      <hr>

      <el-table
        :data="yhlist"
        border
        highlight-current-row
        ref="singleTable"
        style="width:90%;margin:5%  auto;margin-left:6%;"
        empty-text="数据暂时为空"
        @cell-click="getYhmony"
      >
        <el-table-column
          type="index"
          width="50">
        </el-table-column>

        <el-table-column
          prop="amount"
          label="金额（元）"
          width="100px"
          align="left"
        >
        </el-table-column>
        <el-table-column
          prop="beginTime"
          label="开始时间"
          cell-class-name
          align="left">
        </el-table-column>
        <el-table-column
          prop="stopTime"
          label="截止时间"
          cell-class-name
          align="left">
        </el-table-column>
        <el-table-column
          prop="couponCondition"
          label="说明"
          cell-class-name
          width="180px"
          align="left">
        </el-table-column>
      </el-table>
    </div>

    <!--新增优惠券-->
    <el-dialog title="新增优惠券" :visible.sync="dialogFormVisible"  width="30%"  class="dialog" >
      <el-form :model="form">
        <el-form-item label="请输入金额：" :label-width="formLabelWidth"  class="yhItem">
          <el-input v-model="form.account"   class="yhInput"  placeholder="请输入金额"></el-input>
        </el-form-item>
        <el-form-item label="请输入条件：" :label-width="formLabelWidth"   class="yhItem"  placeholder="满多少可以使用">
          <el-input v-model="form.speak" auto-complete="off"   class="yhInput"  placeholder="满多少可以使用"></el-input>
        </el-form-item>
        <el-form-item label="请输入开始时间：" :label-width="formLabelWidth"   class="yhItem">
          <!--<el-input v-model="form.name" auto-complete="off"   class="yhInput"></el-input>-->
          <el-date-picker type="date"  @change="dateChangebirthday"  placeholder="选择日期"   v-model="form.starTime"   class="yhInput"></el-date-picker>
        </el-form-item>
        <el-form-item label="请输入结束时间：" :label-width="formLabelWidth"   class="yhItem">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime"   class="yhInput"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <comBtn btnClass="fged2" btnText="确认"   @click.native="addYHJ"></comBtn>
        <comBtn btnClass="fged2" btnText="取消"   @click.native="close"></comBtn>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default require('./userCmsCtr')
</script>

<style scoped>
  /*
  优惠券
  */
  .dialog{

  }
  .yhItem{
    margin: 5px 0;
  }
  .yhInput{
    width: 80%;
  }
  .dialog-footer{
    width:150px;
    display: flex;
    margin-left: 55%;
    margin-top: -15px;
    justify-content: space-between;
  }


  /*
  树形结构
   */
  #tree>p,#tree>ul{
    text-align: left;
    /*border: 1px solid black;*/
  }

  #tree .icon{
    font-size: 16px;
    margin-left: 5%;
    margin-top: 2%;
    color:rgb(59, 149, 44);
  }
  #tree>ul>li{
    text-align: left;
    /*border: 1px  solid blue;*/
  }
  #tree>ul>li>ul{
    margin-left: 15%;
    width: 80%;
}
  #tree>ul>li>ul>li{
    text-align: left;
    width: 100%;
    /*border: 1px solid red;*/
  }
  #tree li,#tree ul{
    list-style: none !important;
  }


  .bor  a{
    min-width: 50px;
    display: inline-block;
    padding: 2px;
    border: 1px solid  gainsboro;
  }
  .yyphoto img {
    width: 50%;
    height: 60%;
    margin-top: 10%;
  }

  .yyphoto {
    position: fixed;
    top: 0;
    left: 0;
    width: 1349px !important;
    height: 100%;
    /*border-radius: 10px;*/
    overflow: hidden;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.49);
    /*border: 1px solid red;*/
  }

  .imgShow {
    width: 200px;
    height: 180px;
    margin: 3px;
    /*border: 1px solid red;*/
    position: absolute;
    top: 0;
    right: 0;
  }

  .imgShow img {
    width: 100%;
    height: 100%;
  }

  .mybtn {
    display: inline-block;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  /*.open  input{*/
  /*width: 120px;*/
  /*border-radius: 10px;*/
  /*height: 30px;*/
  /*text-indent: 3px;*/
  /*border: 1px solid  gainsboro;*/
  /*}*/
  /*.open  span{*/
  /*display: inline-block;*/
  /*margin-bottom: 5%;*/
  /*}*/

  .redcolor {
    color: red !important;
    background-color: black !important;
  }

  .yhjHtml .addPer-btn {
    width:52% !important;
    display: flex;

    justify-content: space-between;
  }

  /*<!--优惠券-->*/
  .yhjHtml-title {
    color: rgb(59, 149, 44);
    margin: 2%;
    text-align: left;
  }

  .yhjHtml {
    min-height: 400px;
    width:690px !important;
    border: 1px solid rgb(59, 149, 44);
  }

  .yhjHtml .addPer-btn {
    margin-left: 5%;
  }

  #editorElem {
    width: 99%;
    position: relative;
    min-height: 300px;
    margin: 0 auto !important;
  }

  .zdex {
    z-index: -99;
  }

  .prodetail {
    width: 96%;
    border-top: 1px solid rgba(128, 128, 128, 0.6);
    text-align: left;
    color: rgb(59, 149, 44);
    padding: 20px 2%;
  }

  .fileimg {
    position: relative;
    width: 80px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    color: white;
    border-radius: 5px;
    background-color: rgb(59, 149, 44);
    overflow: hidden;
  }

  .fileimg input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  .addPer-btn {
    text-align: left;
    display: flex;
    width: 52%;
    margin: 3% 0;
    margin-left: 2%;
    justify-content: space-between;
  }

  .red {
    color: red;
  }

  .addPerClass {
    width: 90%;
    margin-left: 2%;
    text-align: left;
    /*border: 1px solid red;*/
  }

  .addPerClass p {
    /*border: 1px solid red;*/
    margin-right: 5px;
    display: inline-block;

  }

  #addPer {
    width: 99.5%;
    font-size: 14px;
    padding-bottom: 1%;
    position: relative;
    border: 1px solid rgb(59, 149, 44);
  }

  #addPer input {
    border-radius: 5px;
    border: 1px solid gainsboro;
    /*padding: 0.5%;*/
    text-indent: 5px;
    width: 60px;
    padding: 1% 0;
  }

  select {
    border-radius: 5px;
    padding-left: 10px;
    border: 1px solid gainsboro;
  }

  .proname {
    width: 80px !important;
  }

  .addPer-title {
    color: rgb(59, 149, 44);
    text-align: left;
    width: 20%;
    margin: 2%;
  }

  .conten {
    border: 1px solid rgb(59, 149, 44);
    margin-bottom: 2%;
  }

  .leftPro {
    width:25%;
    min-height: 250px;
    border-radius: 10px;
    margin-right: 2%;
    border: 1px solid  gainsboro;
    /*border: 1px solid red;*/
   padding: 2%;
  }

  .leftPro > div {
    border: 1px solid gainsboro;
    border-radius: 10px;
    text-align: center;
    font-size: 14px;
    padding: 5% 0;
    margin-bottom: 25%;
  }

  .bottom-content {
    display: flex;
    width: 98%;
    padding: 0 1%;
    margin:2% 0;
    justify-content: start;
  }

  .bottom input {
    width: 45%;
    padding: 0 2%;
    text-indent: 0.5em;
    border-radius: 20px;
    border: 1px solid gainsboro;
    outline: none;
  }

  .bottom {
    border-bottom: 1px solid gainsboro;
  }

  .search {
    display: flex;
    width: 33%;
    padding-left: 10%;
    justify-content: space-between;
    /*border: 1px solid gainsboro;*/
  }

  .bottom-btn {
    width: 95%;
    margin: 0 auto;
    margin-left: -1%;
    display: flex;
    /*border: 1px  solid red;*/
    justify-content: space-between;
  }

  .usercms {
    width: 100%;
    /*border: 1px  solid  blue;*/
    overflow: hidden;
    position: relative;
    /*padding-right: 2%;*/
  }

  .usercms > div {
    width: 100%;
    float: left;
  }

  .usercms > ul {
    float: right;
    width: 20%;
    border: 1px solid rgb(59, 149, 44);
  }

  .usercms > ul > li {
    font-size: 14px;
    padding: 10% 0;
    line-height: 30px;
    background-color: rgb(255, 241, 240);
    border-bottom: 1px dashed rgba(128, 128, 128, 0.55);
  }

  .usercms > ul > li:last-of-type {
    border-bottom: none;
  }

  .topBtn, .bottom {
    width: 95%;
    border-top: 1px solid gainsboro;
    padding: 3% 0;
    display: flex;
    justify-content: start;
    padding-left: 5%;
  }

  .gfged {
    margin-left: 10%;
  }

  * {
    margin: 0;
    padding: 0;
  }

  .redBtn {
    width: 90%;
    text-align: left;
    margin: 3% auto;
    border-bottom: 1px solid gainsboro;
    border-radius: 20px;
    font-size: 15px;
    /*margin:3% auto;*/
    overflow: hidden;
  }

  .redBtn ul {
    width: 100%;
    display: flex;
    /*border: 1px solid black;*/
    justify-content: space-between;
  }

  li {
    list-style: none;
    height: 100%;
    text-align: center;
    width: 100%;
    /*border-right: 1px solid red;*/
    padding: 0.6% 0;
    /*margin: 0;*/
  }

  .redBtn li:last-child {
    border: none;
  }

  .hover {
    color: white;
    background-color: red;
  }

</style>
