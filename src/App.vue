<template>
  <Navbar></Navbar>
  <router-view></router-view>

</template>

<script>
import Navbar from "./components/navbar/navbar.vue"
export default {
  name: 'App',
  components: {
    Navbar

  }
}
</script>

<style>
#app {
  text-align: center;
}
</style>