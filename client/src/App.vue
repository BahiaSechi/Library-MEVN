<template>
  <div class="d-flex" id="wrapper">
    <notifications position="bottom center" group="actions" />
    <!-- Sidebar -->
    <div class="bg-light border-right" id="sidebar-wrapper">
      <div class="sidebar-heading">Gestion de bibliothèque </div>
      <div class="list-group list-group-flush">
        <router-link  v-if="this.$cookies.get('token')" class="list-group-item list-group-item-action bg-light" :to="'books'">Livres</router-link>
        <router-link  v-if="this.$cookies.get('token') && this.$cookies.get('role') !== 'CONSULT_ROLE'" class="list-group-item list-group-item-action bg-light" :to="'authors'">Auteurs</router-link>
        <router-link  v-if="this.$cookies.get('token') && this.$cookies.get('role') !== 'CONSULT_ROLE'" class="list-group-item list-group-item-action bg-light" :to="'publishers'">Editeurs</router-link>
        <router-link  v-if="this.$cookies.get('token') && this.$cookies.get('role') !== 'CONSULT_ROLE'" class="list-group-item list-group-item-action bg-light" :to="'loans'">Emprunts</router-link>
        <router-link  v-if="this.$cookies.get('token') && this.$cookies.get('role') !== 'CONSULT_ROLE'" class="list-group-item list-group-item-action bg-light" :to="'users'">Utilisateurs</router-link>
        <b-button v-if="this.$cookies.get('token')" type="button" @click="logout()" variant="primary">Déconnexion</b-button>
        <b-button v-if="!this.$cookies.get('token')" type="button" @click="reload()" variant="primary">Se connecter</b-button>
        <div class="list-group-item list-group-item-action bg-light" v-if="this.$cookies.get('token')">Connecté en tant que : {{this.$cookies.get('username')}}</div>
        <div class="list-group-item list-group-item-action bg-light" v-if="this.$cookies.get('token')">Role associé : {{this.$cookies.get('role')}}</div>
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
  },
  methods: {
    logout() {
      this.$cookies.remove("token");
      this.$cookies.remove("role");
      this.$cookies.remove("username");
      this.reload()
    },
    reload() {
      this.$router.push({
        path: 'login',
        force: true
      }).catch(() => {})
    }
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
