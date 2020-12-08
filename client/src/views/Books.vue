<template>
  <div>
    <h2>LISTE DES LIVRES</h2>
    <div style="margin-top: 50px">
      <b-table :items="apiResponse" :fields="book_fields" striped hover>
        <template #cell(actions)="row">
          <b-button variant="danger" size="sm" @click="deleteBook(row.item.id)" class="mr-2">
            <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
          </b-button>
        </template>
      </b-table>
    </div>
    <div style="margin-top: 50px;">
      <b-form style="display: contents" inline>
        <b-form-input style="margin: 20px" v-model="newBook.title" :placeholder="'Le Petit Prince'" :type="'text'"></b-form-input>
        <b-button variant="outline-primary" @click="addBook()">Ajouter un livre</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>

import books from '../services/books'

export default {
  name: 'Books',
  data() {
    return {
      book_fields: ['title', 'state', 'actions'],
      newBook: {title: "", state: "AVAILABLE"},
      apiResponse: null,
    }
  },

  methods: {
    getAllBooks() {
      books.getAll().then(response => {
        this.apiResponse = response.data;
        this.apiResponse.map((book) => book.state === 'AVAILABLE' ? book.state = 'Disponible' : book.state = "Non disponible")
      });
    },
    addBook(){
      if(this.newBook.title === '') {
        this.$notify({
          group:'actions',
          text: `<b>Il faut renseigner au moins le nom du livre. </b>`,
          type: 'error',
          position: 'bottom center'
        });
      } else {
        books.add(this.newBook).then(() => {
          this.$notify({
            group: 'actions',
            text: '<b>Livre bien ajouté !</b>',
            type: 'success',
            position: 'bottom center'
          });
          this.newBook.title = '';
          this.getAllBooks()
        });
      }
    },
    deleteBook(bookId){
      books.remove(bookId).then(() => {
        this.$notify({
          group:'actions',
          text: '<b>Livre bien supprimé !</b>',
          type: 'success',
          position: 'bottom center'
        });
        this.getAllBooks()
      });
    }
  },
  mounted() {
    this.getAllBooks()
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
