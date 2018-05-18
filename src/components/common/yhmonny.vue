<template>
     <div  class="yhBox">
            <div class="yhBox-content">
                    <el-checkbox   class="checked"></el-checkbox>
                    <div  class="yhBoxPrice">
                            <p>￥10</p>
                            <p>满69使用</p>
                    </div>
                   <div>
                          <p>仅限于智力上点产品</p>
                          <small>有效时间：2018-01-21 到 2018-02-25</small>
                   </div>
            </div>
     </div>
</template>

<script>
    export default {
        name: "yhmonny"
    }
</script>

<style scoped>
 .yhBox{
   width: 100%;
    height: 30px;
   line-height: 30px;
   padding: 2% 0;
   padding-bottom: 5%;
     border-bottom: 1px   dashed  gainsboro;
 }
  .yhBox-content{
      width: 60%;
    display: flex;
    justify-content: space-between;
  }
  .yhBoxPrice p:nth-of-type(1){
     color: red;
  }
 .yhBoxPrice+div p:nth-of-type(1){
   font-weight: bold;
 }
  .checked{
    margin-top: 3%;
  }

</style>
