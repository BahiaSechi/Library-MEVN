<template>
  <div>
    <h2>BIENVENUE</h2>
    <div style="margin-top: 50px">
      Bienvenue sur le site de gestion de bibliothèque ! Commencez par vous connecter afin de pouvoir accéder au contenu du site.
      <p style="margin-top: 30px">Voici les informations de connexion des quatre rôles possibles pour la démo:</p>
      <p>CONSULT_ROLE : user: consult || password: consult_role</p>
      <p>BORROW_ROLE : user: borrow || password: borrow_role</p>
      <p>CONTRIBUTOR_ROLE : user: contributor || password: contributor_role</p>
      <p>ADMINISRATOR_ROLE : user: admin || password: admin_role</p>

      <p><b>Note: Il est possible de s'inscrire en tant qu'utilisateur externe. Le rôle associé sera donc CONSULT_ROLE.</b></p>

    </div>
  </div>

</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>

</style>