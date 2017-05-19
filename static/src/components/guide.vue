<template>
  <div id="guide">
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
    <transition name="slide">
      <div class="step-two"　v-if="step === 2">
        <p>是什么让我遇见这样的你</p>
        <p>仿佛光在哪里</p>
        <p>你就在哪里</p>
        <p>520 因为是你</p>
        <p>所以值得被告白</p>
        <p>制作一份NCU求职帮的告白简历</p>
        <p>让我们一起心动到古稀</p>
      </div>
    </transition>
    <img class="arrow" src="../assets/image/arrow.png">
    <img class="right-flower" src="../assets/image/right-flower.png" alt="">
  </div>
</template>

<script>
  import Hammer from './../../lib/hammer'
  export default {
    name: 'guide',
    data () {
      return {
        step: 1
      }
    },
    methods: {
      init () {
        let guide = document.querySelector('#guide')
        let arrow = document.querySelector('.arrow')
        let hammer = new Hammer(guide)
        let arrowHammer = new Hammer(arrow)
        let time = 0
        hammer.on('panleft', () => {
          if (this.step === 1) {
            this.step = 2
            time = Math.floor(Date.now() / 1000)
          } else {
            if (Math.floor(Date.now() / 1000) - time > 0.6) {
              this.$router.push({name: 'start'})
            }
          }
        })
        hammer.on('panright', () => {
          this.step = 1
        })
        arrowHammer.on('tap', () => {
          if (this.step === 1) {
            this.step = 2
          } else {
            this.$router.push({name: 'start'})
          }
        })
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #guide {
    flex: 1 0 auto;
    padding: 0.533333rem;
    font-size: 0.44rem;
    color: #eb7b7b;
    text-align: center;
    position: relative;
    div {
      transform: translate(0%, 10%);
      line-height: 2.5;
    }
    p {
      margin: 0;
    }
    .step-two {
      transform: translate(0%, 40%);
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
    .arrow {
      width: 1.333333rem;
      height: 1.333333rem;
      position: absolute;
      left: 4.333333rem;
      bottom: 2.666667rem;
      transform: rotate(270deg);
      z-index: 99;
      opacity: 0.6;
    }
    .slide-enter-active .slide-leave-active {
      transition: all 10s;
    }

    .slide-leave .slide-enter-active {
      transform: translate(0%, 40%);
    }
  }
</style>
