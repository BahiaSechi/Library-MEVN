<template>
  <div>
    <h2>LISTE DES UTILISATEURS</h2>
    <div style="margin-top: 50px">
      <b-table :items="apiResponse" :fields="users_fields" striped hover>
        <template #cell(actions)="row">
          <b-button variant="danger" size="sm" @click="deleteUser(row.item._id)" class="mr-2">
            <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
          </b-button>
        </template>
      </b-table>
    </div>
    <div style="margin-top: 50px;">
      <b-form style="display: contents" inline>
        <b-form-input style="margin: 20px" v-model="newUser.username" :placeholder="'Email ou pseudo'" :type="'text'"></b-form-input>
        <b-form-input style="margin: 20px" v-model="newUser.password" :placeholder="'Mot de passe'" :type="'password'"></b-form-input>
        <b-form-select style="margin: 20px" v-model="roleSelected" :options="rolesOptions"></b-form-select>
      </b-form>
    </div>
    <b-button variant="outline-primary" @click="addUser()">Inscrire l'utilisateur</b-button>
  </div>

</template>

<script>

import users from '../services/users'

export default {
  name: 'Users',
  data() {
    return {
      users_fields: ['username', 'actions'],
      newUser: {username:"", password:"", role:""},
      roleSelected: "CONSULT_ROLE",
      apiResponse: null,
      rolesOptions: [{value:"CONSULT_ROLE", text:"Utilisateur"}, {value:"BORROW_ROLE", text:"Agent de bilbiothèque"},
        {value:"CONTRIBUTOR_ROLE", text:"Bibliothécaire"}]
    }
  },
  methods: {
    getAllUsers() {
      users.getAll().then(response => {
        this.apiResponse = response.data
      });
    },
    addUser(){
      if(this.newUser.username === '' || this.newUser.password === '') {
        this.$notify({
          group:'actions',
          text: `<b>Il faut renseigner au moins un nom d'utilisateur et un mot de passe. </b>`,
          type: 'error',
          position: 'bottom center'
        });
      } else if (this.newUser.password.length < 8){
        this.$notify({
          group:'actions',
          text: `<b>Le mot de passe doit contenir au moins 8 caractères. </b>`,
          type: 'error',
          position: 'bottom center'
        });
      } else {
        this.newUser.role = this.roleSelected;
        if(this.newUser.role) {
          users.addUser(this.newUser).then(() => {
            this.$notify({
              group:'actions',
              text: '<b>Utilisateur bien inscrit !</b>',
              type: 'success',
              position: 'bottom center'
            });
            this.newUser.username = this.newUser.password = '';
            this.getAllUsers();
          }).catch(() => {
            this.$notify({
              group:'actions',
              text: "<b>Impossible de créer l'utilisateur</b>",
              type: 'error',
              position: 'bottom center'
            });
          });
        }
      }
    },
    deleteUser(userId){
      users.remove(userId).then(() => {
        this.$notify({
          group:'actions',
          text: '<b>Utilisateur bien supprimé !</b>',
          type: 'success',
          position: 'bottom center'
        });
        this.getAllUsers();
      });
    }
  },
  mounted() {
    if(!this.$cookies.get("token")) {
      this.$router.push("login");
      this.$notify({
        group:'actions',
        text: '<b>Vous devez vous connecter.</b>',
        type: 'error',
        position: 'bottom center'
      });
    }
    if (this.$cookies.get("role") === "CONSULT_ROLE"){
      this.$router.push("books");
      this.$notify({
        group:'actions',
        text: '<b>Vous n\'avez pas la permission d\'accèder à cette page.</b>',
        type: 'error',
        position: 'bottom center'
      });
    }
    this.getAllUsers();
    if(this.$cookies.get('role') !== 'ADMINISTRATOR_ROLE'){
      this.users_fields.pop()
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>