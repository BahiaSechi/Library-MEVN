<template>
  <div>
    <h2>REGISTER</h2>
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

      <b-button type="submit" variant="primary">Register</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "Register"
}
</script>

<style scoped>

</style>