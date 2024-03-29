<template>
    <div id="Navbar">
      <v-btn href="/">Meine Liebslingsfilme</v-btn>
      <v-btn href="/search">Suche</v-btn>
      <img src="" alt="">
  </div>
</template>
<script>
export default {
  name: 'NavBar',

}
</script>
<style scoped>

#Navbar {

  background-color: brown;
}
.v-btn{
  margin-top: 100px;
  margin: 5px
}
.v-btn:hover{
  background-color: rgb(248, 134, 134)
}

</style>