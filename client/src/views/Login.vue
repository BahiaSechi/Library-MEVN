<template>
  <div>
    <h2>LOGIN</h2>
    <b-form>
      <b-form-group id="username_add" label="Username:" label-for="username">
        <b-form-input
            id="username"
            type="text"
            required
            placeholder="Username"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="password_add" label="Password:" label-for="password">
        <b-form-input
            id="password"
            required
            placeholder="Password"
            type="password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>

</template>

<script>
export default {
  name: "Login"
}
</script>

<style scoped>

</style>