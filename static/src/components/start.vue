<template>
  <div id="start">
    <img class="wrapper" src="../assets/image/start.png" alt="">
    <div class="start-container">
      <button type="button" class="start-btn">
        开始制作
        <img class="start-flower" src="../assets/image/start-flower.png"alt="">
        <img class="start-cursor" src="../assets/image/cursor.png" alt="">
      </button>
    </div>
  </div>
</template>

<script>
  import Hammer from '../../lib/hammer'

  export default {
    name: 'start',
    data () {
      return {}
    },
    methods: {
      init () {
        let startBtn = document.querySelector('.start-btn')
        let hammer = new Hammer(startBtn)
        hammer.on('tap', () => {
          this.$router.push({name: 'add'})
        })
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style lang="scss" scoped>
  #start {
    flex: 1 0 auto;
    text-align: center;
    padding: 25% 0;
    .wrapper {
      height: 5.426667rem;
      width: 7.706667rem;
    }
    .start-container {
      .start-btn {
        position: relative;
        width: 4.826667rem;
        height: 2.906667rem;
        border-radius: 0.786667rem;
        font-size: 0.773333rem;
        padding: 0;
        font-weight: 700;
        color: #eb7b7b;
        background: #fff;
        box-shadow: 0 0 30px 5px rgba(0, 0, 0, .15);
        border: 0;
        outline: none;
        .start-flower {
          position: absolute;
          left: -0.493333rem;
          top: -0.293333rem;
          width: 1.186667rem;
          height: 1.266667rem;
        }
        .start-cursor {
          width: 2.013333rem;
          height: 1.973333rem;
          position: absolute;
          right: -0.4rem;
          bottom: -0.4rem;
        }
      }
    }
  }
</style>
