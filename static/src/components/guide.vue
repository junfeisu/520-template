<template>
  <div class="guide">
    <img class="top-flower" v-if="step===1" src="../assets/image/top-flower.png">
    <img class="left-flower" src="../assets/image/left-flower.png"></img>
    <div class="step-one" v-if="step===1">
      <p>从被拒后的低落</p>
      <p>到接受后的狂喜</p>
      <p>求职的过程</p>
      <p>真的很像追求暗恋对象</p>
      <p>找一份自己喜欢的工作有多难</p>
      <p>而这个地球有几十亿人口</p>
      <p>俩个人相爱的概率</p>
      <p>又是几千万分之一？</p>
    </div>
    <div class="step-two"　v-if="step === 2">
      <p>是什么让我遇见这样的你</p>
      <p>仿佛光在哪里</p>
      <p>你就在哪里</p>
      <p>520 因为是你</p>
      <p>所以值得被告白</p>
      <p>制作一份NCU求职帮的告白简历</p>
      <p>让我们一起心动到古稀</p>
    </div>
    <img class="right-flower" src="../assets/image/right-flower.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        step: 1
      }
    },
    mounted () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .guide {
    flex: 1 0 auto;
    flex-wrap: wrap;
    padding: 0.533333rem;
    font-size: 0.44rem;
    color: #eb7b7b;
    text-align: center;
    position: relative;
    padding: 0.533333rem;
    div {
      transform: translate(0%, 25%);
      line-height: 2.5;
    }
    p {
      margin: 0;
    }
    .step-two {
      transform: translate(0%, 50%);
    }
    .top-flower {
      width: 7.986667rem;
      height: 1.546667rem;
    }
    .left-flower {
      height: 7.96rem;
      width: 8.146667rem;
      position: absolute;
      left: 0.533333rem;
      top: 0.533333rem;
    }
    .right-flower {
      height: 7.96rem;
      width: 8.146667rem;
      position: absolute;
      right: 0.533333rem;
      bottom: 1.0rem;
    }
  }
</style>
