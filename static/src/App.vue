<template>
  <div id="app">
    <router-view></router-view>
    <footer>
      NCU求职帮
    </footer>
  </div>
</template>

<script>
import './../lib/flexible.js'
export default {
  name: 'app'
}
</script>

<style>
body {
  height: 17.58rem;
  background: #f4dddd;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  height: 100%;
  position: relative;
}

footer {
  width: 100%;
  height: 0.96rem;
  text-align: center;
  line-height: 0.96rem;
  background: #050001;
  position: absolute;
  bottom: 0;
  opacity: 0.4;
  font-size: 0.44rem;
  color: #fff;
}
</style>
