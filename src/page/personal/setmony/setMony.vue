<template>
    <div  class="setMony">
           <p>充值</p>
           <div class="setText">
                <p><span  class="red">*</span>金额（元） <input type="text"  placeholder="请输入金额"  v-model="mony"></p>
                <p>100金币=1元钱</p>
                <p>金币金额：{{bannas*100}}</p>
           </div>
            <div class="btnlist">
        <comBtn btnClass="bigBtn"  btnText="确定"   @clicked="getMony"></comBtn>
        <comBtn btnClass="noborder2"  btnText="取消"   @clicked="backMony"></comBtn>
      </div>

    </div>
</template>

<script>
export  default  require('./setMonyCtr')
</script>

<style scoped>

  /*
  动态加载内容
   */
  .addHtml  form{
    height: 500px !important;
  }
  .addHtml{
    width: 100%;
    height: 300px;
    border: 1px solid red;
    position: relative;
    z-index: 999;
  }
  .setText{
     font-size: 14px;
  }

  .red{
    color: red;
  }
  .setText  input{
     border-radius: 20px;
    outline: none;
    text-indent: 0.5em;
    border: 1px solid rgba(128, 128, 128, 0.66);
    padding: 0.5%;
  }
  .btnlist{
    width: 40%;
    display: flex;
    margin:3%  auto;
    justify-content: space-between;
  }
.setMony{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10%;
  background-color: gainsboro;
}
  .setMony  p{
    margin: 3%  auto;
  }
</style>
