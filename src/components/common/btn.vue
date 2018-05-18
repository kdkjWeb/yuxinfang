<template>
  <div class="comBtn">
       <button :class="btnClass" @click="clickBtn">{{btnText}}</button>
  </div>
</template>

<script>
  export default {
    name:"comBtn",
    props:['btnClass','btnText'],
    methods:{
      clickBtn(){
        this.$emit("clicked");
      }
    }
  }
</script>

<style lang="less" scoped>
  .comBtn{
    height: 28px;
  }
  .teaBtn(@padding,@backColor:rgb(59,149,44),@border:none,@color:white,@border-radius:30px){
    outline: none;
    border: none;
    color: @color;
    border-radius:@border-radius;
    padding:@padding;
    border: @border;
    background-color: @backColor;
  }
  button:hover{
    cursor: pointer;
  }

  .bigBtn{
    .teaBtn(4px 40px)
  }
  .bigBtn2{
    .teaBtn(4px 14px)
  }
  .noborder{
    .teaBtn(4px 15px,white,1px solid rgb(59,149,44),rgb(59,149,44));
  }
  .noborder2{
    .teaBtn(4px 40px,white,1px solid rgb(59,149,44),rgb(59,149,44));
  }
 .red{
   .teaBtn(4px 30px,rgb(240,51,53))
 }

 .orenge{
   .teaBtn(4px 30px,rgb(253,136,0))
 }

 .large{
   .teaBtn(4px 60px)
 }


  /*方的短按钮*/
  .fged{
    .teaBtn(4px 30px,rgb(59,149,44),@border-radius:6px)
  }
  .fged2{
    .teaBtn(4px 15px,rgb(59,149,44),@border-radius:6px)
  }
  .fred{
    .teaBtn(4px 20px,red,@border-radius:6px)
  }

  .send{
    .teaBtn(8px 22px,rgb(253,136,0),@border-radius:6px)
  }
  .sendg{
    .teaBtn(8px 29px,rgb(59,149,44),@border-radius:6px)
  }


</style>
