<template>
  <div>
    <h2>LISTE DES AUTEURS</h2>
    <div style="margin-top: 50px">
      <b-table :items="apiResponse" :fields="author_fields" striped responsive="sm">
        <template #cell(actions)="row">
          <b-button variant="danger" size="sm" @click="deleteAuthor(row.item.id)" class="mr-2">
            <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
          </b-button>
        </template>
      </b-table>
    </div>
    <div style="margin-top: 50px;">
      <b-form style="display: contents" inline>
        <b-form-input style="margin: 20px" v-model="newAuthor.name" :placeholder="'Simone de Beauvoir'" :type="'text'"></b-form-input>
        <b-button variant="outline-primary" v-on:click="addAuthor()">Ajouter un auteur</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>

import authors from '../services/authors'

export default {
  name: 'Authors',
  data() {
    return {
      author_fields: ['name', 'actions'],
      newAuthor: {name:""},
      apiResponse: null,
    }
  },

  methods: {
    getAllAuthors() {
      authors.getAll().then(response => {
        this.apiResponse = response.data
      });
    },
    addAuthor(){
      authors.add(this.newAuthor).then(() => {
        this.$notify({
          group:'actions',
          text: '<b>Auteur bien ajouté !</b>',
          type: 'success',
          position: 'bottom center'
        });
        this.getAllAuthors()
      });
    },
    deleteAuthor(authorId){
      authors.remove(authorId).then(() => {
        this.$notify({
          group:'actions',
          text: '<b>Auteur bien supprimé !</b>',
          type: 'success',
          position: 'bottom center'
        });
        this.getAllAuthors()
      });
    }
  },
  mounted() {
    this.getAllAuthors()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
