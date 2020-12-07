<template>
  <div>
    <h2>LISTE DES EDITEURS</h2>
    <div>
      <b-table id="table" striped hover :items="apiResponse" :fields="publishers_fields">
      </b-table>
      <b-form inline>
        <b-form-input v-model="newPublisher.name" :placeholder="'Hachette'" :type="'text'"></b-form-input>
        <b-button variant="outline-primary" v-on:click="addPublisher()">Ajouter un éditeur</b-button>
        <b-button variant="outline-primary">Supprimer</b-button>
      </b-form>
    </div>
  </div>

</template>

<script>

import publishers from '../services/publishers'

export default {
  name: 'Publishers',
  props: {
    msg: String
  },
  data() {
    return {
      publishers_fields: ['name'],
      newPublisher: {name:""},
      apiResponse: null
    }
  },
  methods: {
    addPublisher(){
      publishers.add(this.newPublisher).then(() => {
        this.$toasted.show("Editeur bien ajouté.", {type:"success"})
      });
    }
  },
  mounted() {
    publishers.getAll().then(response => {
      this.apiResponse = response.data
    })
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

#table {
  margin-top: 50px;
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