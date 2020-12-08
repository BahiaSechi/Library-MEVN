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
        ></b-form-input>
        <b-form-input
          style="margin: 20px"
          id="password"
          required
          placeholder="Password"
          type="password"
      ></b-form-input>
      </b-form>
    </div>
    <b-button type="submit" variant="primary">Se connecter</b-button>
  </div>

</template>

<script>
export default {
  name: "Login"
}
</script>

<style scoped>

</style>