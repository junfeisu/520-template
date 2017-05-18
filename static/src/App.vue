<template>
  <div id="app">
    <remind></remind>
    <router-view></router-view>
    <footer v-if="$route.path !== '/add'">
      <a class="link" href="https://mp.weixin.qq.com/mp/profile_ext">NCU求职帮</a>
    </footer>
  </div>
</template>

<script>
  import './../lib/flexible.js'
  export default {
    name: 'app',
    methods: {
      add (data) {
        this.$root.$children[0].addRemind(data)
      }
    }
  }
</script>

<style lang="scss">
html {
  height: 100%;
}
body {
  height: 100%;
  background: #f4dddd;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  display: flex;
  height: 100%;
  position: relative;
}

footer {
  height: 0.96rem;
  text-align: center;
  line-height: 0.96rem;
  background: #050001;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.2;
  font-size: 0.44rem;
  a {
    text-decoration: none;
    color: #fff;
    &:visited {
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>
