<template>
  <div class="bigBox">
    <small>
      <span  @click="backindex"  style="cursor: pointer">主页</span>
      <span>  >  </span>
      <span style="cursor: pointer">{{smalltitle}}</span>
    </small>
    <h3 class="title">{{smalltitle}}</h3>
    <slot  name="requse"> </slot>
  </div>
</template>

<script>
  import  comBtn  from '../common/btn'
  export default {
    name: "minNav",
    components: {
      comBtn,
    },
    props:['smalltitle'],
    methods: {
      backindex() {
        this.$router.push("/");
      }
    }
  }
</script>

<style scoped>
 .bigBox{
   width: 66%;
   margin:1.5% auto;
   display: flex;
   color:rgb(59,149,44) ;
   justify-content: start;
   border-bottom: 1px solid rgb(59,149,44);
   padding-bottom: 1%;
 }
  .title{
    margin: 0  auto;
  }
</style>
