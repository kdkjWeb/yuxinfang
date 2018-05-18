<template>
    <div>
      <!--<topnav></topnav>-->
      <div  class="register">
        <p class="registerTitle">机构申请入驻</p>
        <table>
          <tbody>
          <tr>
            <td align="right">商家名称<span>*</span>：</td>
            <td><input type="text"  placeholder=" 请输入商家名称"  v-model="sname"></td>
          </tr>
          <tr>
            <td align="right">姓名<span>*</span>：</td>
            <td><input type="text"  placeholder="请输入姓名"  v-model="name"></td>
          </tr>
          <tr>
            <td align="right">昵称<span>*</span>：</td>
            <td><input type="text"  placeholder="请输入昵称"  v-model="niname"></td>
          </tr>
          <tr>
            <td align="right">手机号<span>*</span>：</td>
            <td><input type="text"  placeholder="请输入手机号"  v-model="phone"></td>
          </tr>
          <tr>
            <td align="right">验证码<span>*</span>：</td>
            <td>
              <input type="password"  placeholder="请输入验证码"    class="minInput"  v-model="validCode">
              <comBtn btnClass="bigBtn2"  btnText="发送验证码"  @clicked="sendPhone"></comBtn>
            </td>
          </tr>
          <tr>
            <td align="right">营业执照<span>*</span>：</td>
            <td>
              <input type="text"  :placeholder=" pototest"  class="minInput  "  id="max">
             <span  id="fileimg" > 上传<input type="file"  style="opacity: 0"  @change="file"></span>
            </td>
          </tr>
          <tr>
            <td align="right">身份证号<span>*</span>：</td>
            <td><input type="text"  placeholder=" 请输入身份证号"  v-model="idCard"></td>
          </tr>
          <tr>
            <td align="right">银行卡号<span>*</span>：</td>
            <td><input type="text"  placeholder=" 请输入银行卡号"  v-model="monnyno"></td>
          </tr>
          <tr>
            <td align="right">支付宝账号<span>*</span>：</td>
            <td>
              <input type="text"  placeholder="请输入支付宝账号"  v-model="zfbno">
            </td>
          </tr>

          <tr>
            <td align="right">密码<span>*</span>：</td>
            <td><input type="password"  placeholder="请输入密码"  v-model="pass"></td>
          </tr>
          <tr>
            <td align="right">确认密码<span>*</span>：</td>
            <td><input type="password"  placeholder="请再次确认密码"  v-model="onepass"></td>
          </tr>
          </tbody>
        </table>
        <p  class="registerBtn">
          <comBtn btnClass="bigBtn"  btnText="申请入驻"  @clicked="register"></comBtn>
          <comBtn btnClass="noborder2"  btnText="取消"   @clicked="backregister"></comBtn>
        </p>
      </div>
      <!--<sfooter></sfooter>-->
    </div>
</template>

<script>
  export   default   require("./mecCtr")
</script>

<style scoped>
  #fileimg{
    display: inline-block;
    width: 70px;
    height: 25px;
    color: white;
    text-align: center;
    line-height: 25px;
    border-radius: 20px;
    position: relative;
    background-color:rgb(59,149,44)  ;
  }
  #fileimg  input{
    position: absolute;
    top:0;
    left:0
  }

  .register{
    width:40%;
    padding-bottom: 3%;
    margin:3%  auto;
    border-radius: 10px;
    overflow: hidden;
    font-size: 14px;
    box-shadow: 1px 1px 2px 1px #c9c9c9;
  }
  table{
    width:70%;
    height: 70%;
    /*border: 1px solid red;*/
    margin: 0  auto;
    padding: 0 3%;
  }
  .registerTitle{
    margin: 5%;
    font-weight: bold;
  }
  table tr{
    height: 35px;
  }
  .minInput{
    width:40% !important;
    margin-right: 7%;
    float: left;
  }

  #max{
    width: 55%  !important;
    margin-right:0 !important;
  }

  table span{
    color: red;
    margin-left: 5%;
  }

  table tr  td:nth-of-type(1){
    width:20%;
  }

  table tr  td:nth-of-type(2){
    width:40%;
    text-align: left;
  }

  table tr  td:nth-of-type(2) input{
    margin-left: 5%;
    width: 100%;
    border-radius: 20px;
    font-size: 12px;
    text-indent:5%;
    padding: 2% 0;
    outline: none !important;
    border: 1px solid gainsboro;
  }

  .registerBtn{
    width: 50%;
    display: flex;
    margin: 0  auto;
    margin-top:3%;
    justify-content: space-between;
  }
</style>
