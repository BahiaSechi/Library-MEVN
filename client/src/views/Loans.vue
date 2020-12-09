<template>
  <div>
    <h2>LISTE DES EMPRUNTS</h2>
    <div style="margin-top: 50px">
      <b-table :items="apiResponse" :fields="loans_fields" striped hover>
        <template #cell(actions)="row">
          <b-button variant="danger" size="sm" @click="deleteLoan(row.item.id)" class="mr-2">
            <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
          </b-button>
        </template>
      </b-table>
    </div>
    <div style="margin-top: 50px;">
      <b-form style="display: contents" inline>
        <b-form-input style="margin: 20px" :placeholder="'TODO add select user and book'" :type="'text'"></b-form-input>
        <b-button variant="outline-primary" @click="addAuthor()">Ajouter un emprunt</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>

import loans from "@/services/loans";

export default {
  name: 'Loans',
  data() {
    return {
      author_fields: ['clientId', 'bookId', 'startDatetime', 'endDatetime',  'actions'],
      newLoan: {name:""},
      apiResponse: null,
    }
  },

  methods: {
    getAllLoans() {
      loans.getAll().then(response => {
        this.apiResponse = response.data
      });
    },
    addALoan(){
      if(this.newLoan.name === '') {
        this.$notify({
          group:'actions',
          text: `<b>Il faut renseigner au moins un nom d'auteur. </b>`,
          type: 'error',
          position: 'bottom center'
        });
      } else {
        loans.add(this.newLoan).then(() => {
          this.$notify({
            group: 'actions',
            text: '<b>Auteur bien ajouté !</b>',
            type: 'success',
            position: 'bottom center'
          });
          this.newLoan.name = '';
          this.getAllAuthors()
        });
      }
    },
    deleteLoan(loanId){
      loans.remove(loanId).then(() => {
        this.$notify({
          group:'actions',
          text: '<b>Emprunt bien supprimé !</b>',
          type: 'success',
          position: 'bottom center'
        });
        this.getAllLoans()
      });
    }
  },
  mounted() {
    this.getAllLoans()
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
