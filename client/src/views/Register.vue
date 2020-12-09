<template>
  <div>
    <h2>INSCRIPTION</h2>
    <div style="margin-top: 50px;">
      <b-form style="display: contents" inline>
        <b-form-input
            style="margin: 20px"
            id="username"
            type="text"
            required
            placeholder="Username"
            v-model="newUser.username"
        ></b-form-input>
        <b-form-input
            style="margin: 20px"
            id="password"
            required
            placeholder="Password"
            type="password"
            v-model="newUser.password"
        ></b-form-input>
      </b-form>
    </div>
    <b-button type="button" @click="register()" variant="primary">Inscription</b-button>
  </div>
</template>

<script>
import users from "@/services/users";

export default {
  name: "Register",
  data() {
    return {
      newUser: {username:"", password:""},
    }
  },
  methods : {
    register() {
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
        users.register(this.newUser).then(() => {
          this.$notify({
            group:'actions',
            text: '<b>Utilisateur bien inscrit !</b>',
            type: 'success',
            position: 'bottom center'
          });
          this.newUser.username = this.newUser.password = '';
          this.$router.push('login')
        }).catch(() => {
          this.$notify({
            group:'actions',
            text: `<b>Le compte existe déjà. </b>`,
            type: 'error',
            position: 'bottom center'
          });
        });
      }
    }
  }
}
</script>

<style scoped>

</style>