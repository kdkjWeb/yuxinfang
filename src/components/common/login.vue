<template>
  <div  class="register">
    <p class="registerTitle">登录</p>
    <table>
      <tbody>
      <tr>
        <td align="right">手机号：</td>
        <td><input type="text"  placeholder="请输入手机号 "></td>
      </tr>
      <tr>
        <td align="right">密码：</td>
        <td><input type="text"  placeholder="请输入密码"></td>
      </tr>
      </tbody>


    </table>
    <p  class="registerBtn">
      <comBtn btnClass="bigBtn"  btnText="确定"></comBtn>
      <comBtn btnClass="noborder"  btnText="取消"></comBtn>
    </p>

  </div>
</template>

<script>
  import  comBtn  from '../common/btn'
  export default {
    name: "login",
    components:{
      comBtn
    }
  }
</script>

<style scoped>
  .register{
    width:40%;
    height: 400px;
    padding-bottom: 10%;
    margin: 0  auto;
    border-radius: 10px;
    overflow: hidden;
    font-size: 14px;
    margin-bottom: 6%;
    box-shadow: 1px 1px 2px 1px #c9c9c9;
  }
  table{
    width:70%;
    height: 40%;
    /*border: 1px solid red;*/
    margin: 0  auto;
    padding: 0 3%;
    margin-right: 20%;
  }
  .registerTitle{
    margin: 5%;
    font-weight: bold;
  }


  table tr  td:nth-of-type(1){
    width:20%;
  }
  table tr  td:nth-of-type(2){
    width:50%;
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
    margin-top: 5%;
    justify-content: space-between;
  }
</style>
