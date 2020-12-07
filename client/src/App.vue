<template>
  <div class="d-flex" id="wrapper">
    <notifications position="bottom center" group="actions" />
    <!-- Sidebar -->
    <div class="bg-light border-right" id="sidebar-wrapper">
      <div class="sidebar-heading">Gestion de bibliothèque </div>
      <div class="list-group list-group-flush">
        <router-link  class="list-group-item list-group-item-action bg-light" :to="'books'">Livres</router-link>
        <router-link  class="list-group-item list-group-item-action bg-light" :to="'authors'">Auteurs</router-link>
        <router-link  class="list-group-item list-group-item-action bg-light" :to="'publishers'">Editeurs</router-link>
        <router-link  class="list-group-item list-group-item-action bg-light" :to="'borrowings'">Emprunts</router-link>
        <router-link  class="list-group-item list-group-item-action bg-light" :to="'users'">Utilisateurs</router-link>
        <router-link  class="list-group-item list-group-item-action bg-light" :to="'logout'">Déconnexion</router-link>
      </div>
    </div>
    <div id="page-content-wrapper">
      <img alt="ENSICAEN logo" style="max-width: 200px" src="./assets/ensi.jpg">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
require('@/assets/css/style.css')
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
