<template>
  <div>
    <h2>LISTE DES AUTEURS</h2>
    <div>
      <b-table id="table" striped hover :items="apiResponse" :fields="author_fields">
      </b-table>
      <b-form inline>
        <b-form-input v-model="newAuthor.name" :placeholder="'Simone de Beauvoir'" :type="'text'"></b-form-input>
        <b-button variant="outline-primary" v-on:click="addAuthor()">Ajouter un auteur</b-button>
        <b-button variant="outline-primary" v-on:click="deleteAuthor()">Supprimer</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>

import authors from '../services/authors'

export default {
  name: 'Authors',
  props: {
    msg: String
  },
  data() {
    return {
      author_fields: ['name'],
      newAuthor: {name:""},
      apiResponse: null,
    }
  },

  methods: {
    addAuthor(){
      authors.add(this.newAuthor).then(() => {
        this.$toasted.show("Auteur bien ajouté.", {type:"success"})
      });
    },
    deleteAuthor(){
      //TODO Changer le 5 en vrai id
      authors.remove(5).then(() => {
        this.$toasted.show("Auteur bien supprimé.", {type:"success"})
      });
    }
  },
  mounted() {
    authors.getAll().then(response => {
      this.apiResponse = response.data
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
