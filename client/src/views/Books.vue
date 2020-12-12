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
        <b-form-select style="margin: 20px" multiple v-model="authorsSelected" :options="authorsOptions"></b-form-select>
        <b-form-select v-model="publisherSelected" :options="publisherOptions"></b-form-select>
        <b-form-input style="margin: 20px" v-model="newBook.title" :placeholder="'Le Petit Prince'"></b-form-input>
      </b-form>
    </div>
    <b-button variant="outline-primary" @click="addBook()">Ajouter un livre</b-button>
  </div>
</template>
<script>

import books from '../services/books'
import authors from "@/services/authors";
import publishers from "@/services/publishers";

export default {
  name: 'Books',
  data() {
    return {
      book_fields: ['title', 'auteurs', 'editeur', 'state', 'actions'],
      newBook: {title: "", state: "AVAILABLE"},
      publisherOptions: [{ value: null, text: 'Choisissez l\'éditeur ', disabled: true}],
      authorsOptions: [{ value: null, text: 'Choisissez le ou les auteurs', disabled: true}],
      apiResponse: null,
      publisherSelected: null,
      authorsSelected: [],
    }
  },

  methods: {
    getAllBooks() {
      this.publisherOptions = [{ value: null, text: 'Choisissez l\'éditeur ', disabled: true}];
      this.authorsOptions = [{ value: null, text: 'Choisissez le ou les auteurs', disabled: true}];
      const promises = [];
      books.getAll().then(response => {
        response.data.map((book) => {
          book.auteurs = [];
          book.authorsId.forEach((authorId) => {
            promises.push(
                authors.getById(authorId).then((author) => {
                  book.auteurs.push(author.data.name)
                  return book.auteurs;
                })
            );
          });
          book.state === 'AVAILABLE' ? book.state = 'Disponible' : book.state = "Non disponible"
        })
        Promise.all(promises).then(() => {response.data.map((book) => {
          publishers.getById(book.publisherId).then((publisher) => {
            console.log("hello")
            book.editeur = publisher.data.name;
            book.auteurs = book.auteurs.join(', ')}); this.apiResponse = response.data;
          })
        });
      }).then(() => {
        authors.getAll().then((response) => {response.data.map((author) => this.authorsOptions.push({value:author.id, text:author.name})
            )}
        )}).then(() => {
            publishers.getAll().then((response) => {
              response.data.map((publisher) => this.publisherOptions.push({value:publisher.id, text:publisher.name}))
            })
        });
    },
    addBook(){
      if(this.newBook.title === '' || !this.publisherSelected || this.authorsSelected.length === 0) {
        this.$notify({
          group:'actions',
          text: `<b>Il faut renseigner au moins le nom du livre, un auteur et l'éditeur. </b>`,
          type: 'error',
          position: 'bottom center'
        });
      } else {
        this.newBook.publisherId = this.publisherSelected;
        this.newBook.authorsId = this.authorsSelected;
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
      }).catch(() => {
        this.$notify({
          group:'actions',
          text: '<b>Un emprunt est associé à ce livre.</b>',
          type: 'error',
          position: 'bottom center'
        });
      });
    }
  },
  mounted() {
    this.getAllBooks()
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
