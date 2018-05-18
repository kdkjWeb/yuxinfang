<template>
     <div class="answerBox">
         <div class="textList">
               <p>随遇而安</p>
               <span>2018-09-23</span>
          </div>
          <p  class="words">
            世界上最远的距离 不是 生与死的距离
            而是 我站在你面前 你不知道我爱你
            世界上最远的距离
            不是 我站在你面前 你不知道我爱你
            而是 爱到痴迷 却不能说我爱你
            世界上最远的距离 不是 我不能说我爱你
            而是 想你痛彻心脾 却只能深埋心底
            世界上最远的距离 不是 我不能说我想你
            而是 彼此相爱 却不能够在一起
            世界上最远的距离 不是 彼此相爱
            却不能够在一起 而是明知道真爱无敌
            却装作毫不在意
            世界上最远的距离
            不是 树与树的距离
            而是 同根生长的树枝 却无法在风中相依
            世界上最远的距离 不是 树枝无法相依
            而是 相互了望的星星 却没有交汇的轨迹
            世界上最远的距离 不是 星星之间的轨迹
            而是 纵然轨迹交汇 却在转瞬间无处寻觅
            世界上最远的距离 不是 瞬间便无处寻觅
            而是 尚未相遇 便注定无法相聚
            世界上最远的距离
            是鱼与飞鸟的距离 一个在天
            一个却深潜海底
          </p>
     </div>
</template>

<script>
    export default {
        name: "answerBox"
    }
</script>

<style scoped>
  .answerBox{
    width: 98%;
    margin: 3% auto;
    color: grey;
    padding-bottom:0.5%;
    box-shadow: 1px 1px 2px 1px #c9c9c9;
    border-radius: 10px;
  }
  .textList{
    width: 90%;
    display: flex;
    padding: 1% 0;
    margin: 1% auto;
    font-size: 14px;
    justify-content: space-between;
    border-bottom: 1px solid gainsboro;
  }
  .words{
    width: 90%;
    margin:1.5% auto;
    text-align: left;
    font-size: 12px;
    line-height: 20px;
  }
  .textList p{
    color: rgb(59,149,44);
  }
</style>
