<template>
  <div>
    <h2>CONNEXION</h2>

    <div style="margin-top: 50px;">
      <b-form style="display: contents" inline>
        <b-form-input
            style="margin: 20px"
            id="username"
            type="text"
            required
            placeholder="Username"
            v-model="formUser.username"
        ></b-form-input>
        <b-form-input
          style="margin: 20px"
          id="password"
          required
          placeholder="Password"
          type="password"
          v-model="formUser.password"
        ></b-form-input>
      </b-form>
    </div>
    <b-button type="button" @click="login()" variant="primary">Se connecter</b-button>
  </div>

</template>

<script>
import users from "@/services/users";
import Vue from "vue";

export default {
  name: "Login",
  data() {
    return {
      formUser: {username:"", password:""}
    }
  },
  methods: {
    login() {
      users.login(this.formUser).then((token) => {
        Vue.prototype.$token = token.data.ret;
      }).catch(() => {
        this.$notify({
          group:'actions',
          text: `<b>Vos identifiants de connexion sont incorrects. </b>`,
          type: 'error',
          position: 'bottom center'
        });
      })
    }
  }
}
</script>

<style scoped>

</style>