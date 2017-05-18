<template>
  <div id="app">
    <router-view></router-view>
    <footer v-if="$route.path !== '/add'">
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  color: #fff;
}
</style>
