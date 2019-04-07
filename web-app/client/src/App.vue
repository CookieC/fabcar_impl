<template>
  <div id="app">
    <header-comp></header-comp>
      <router-view></router-view>
    </div>
</template>

<script>
import headerComp from './components/layout/AppHeader.vue'

export default {
  name: 'app'  ,

    components: {
      headerComp,
    },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}

</style>
