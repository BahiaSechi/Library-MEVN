<template>
  <div>
    <h2>LISTE DES AUTEURS</h2>
    <div style="margin-top: 50px">
      <b-table :items="apiResponse" :fields="author_fields" striped hover>
        <template #cell(actions)="row">
          <b-button variant="danger" size="sm" @click="deleteAuthor(row.item.id)" class="mr-2">
            <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
          </b-button>
        </template>
      </b-table>
    </div>
    <div v-if="this.$cookies.get('role') === 'ADMINISTRATOR_ROLE' || this.$cookies.get('role') === 'CONTRIBUTOR_ROLE'" style="margin-top: 50px;">
      <b-form style="display: contents" inline>
        <b-form-input style="margin: 20px" v-model="newAuthor.name" :placeholder="'Simone de Beauvoir'" :type="'text'"></b-form-input>
        <b-button variant="outline-primary" @click="addAuthor()">Ajouter un auteur</b-button>
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
      if(this.newAuthor.name === '') {
        this.$notify({
          group:'actions',
          text: `<b>Il faut renseigner au moins un nom d'auteur. </b>`,
          type: 'error',
          position: 'bottom center'
        });
      } else {
        authors.add(this.newAuthor).then(() => {
          this.$notify({
            group: 'actions',
            text: '<b>Auteur bien ajouté !</b>',
            type: 'success',
            position: 'bottom center'
          });
          this.newAuthor.name = '';
          this.getAllAuthors()
        });
      }
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
    if (this.$cookies.get("role") === "CONSULT_ROLE"){
      this.$router.push("books");
      this.$notify({
        group:'actions',
        text: '<b>Vous n\'avez pas la permission d\'accèder à cette page.</b>',
        type: 'error',
        position: 'bottom center'
      });
    }
    if(this.$cookies.get('role') === 'CONSULT_ROLE' || this.$cookies.get('role') === 'BORROW_ROLE'){
      this.author_fields.pop()
    }
  },
  created() {
    if(!this.$cookies.get("token")) {
      this.$router.push("login");
      this.$notify({
        group:'actions',
        text: '<b>Vous devez vous connecter.</b>',
        type: 'error',
        position: 'bottom center'
      });
    }
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
