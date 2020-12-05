<template>
  <div class="d-flex" id="wrapper">

    <!-- Sidebar -->
    <div class="bg-light border-right" id="sidebar-wrapper">
      <div class="sidebar-heading">Gestion de bibliothèque </div>
      <div class="list-group list-group-flush">
        <router-link  class="list-group-item list-group-item-action bg-light" :to="'contact'">Accueil</router-link>
        <a href="#" class="list-group-item list-group-item-action bg-light">Editeurs</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Auteurs</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Utilisateurs</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Emprunts</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Déconnexion</a>
      </div>
    </div>
    <div id="page-content-wrapper">
      <img alt="Vue logo" src="./assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
require('@/assets/css/style.css')
export default {
  name: 'App',
  components: {
    HelloWorld
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
