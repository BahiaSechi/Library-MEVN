<template>
  <div>
    <h2>LISTE DES EMPRUNTS</h2>
    <div style="margin-top: 50px">
      <b-table :items="apiResponse" :fields="loans_fields" striped hover>
        <template #cell(actions)="row">
          <b-button variant="success" size="sm" @click="validateLoan(row.item.id)" class="mr-2" data-toggle="tooltip" data-placement="top" title="Valider le retour du livre">
            <b-icon icon="check-circle-fill" aria-hidden="true"></b-icon>
          </b-button>
          <b-button variant="danger" size="sm" @click="deleteLoan(row.item.id)" class="mr-2">
            <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
          </b-button>
        </template>
      </b-table>
    </div>
    <div style="margin-top: 50px;">
      <b-form style="display: contents" inline>
        <b-form-select style="margin: 20px" v-model="clientSelected" :options="clientOptions"></b-form-select>
        <b-form-select v-model="bookSelected" :options="bookOptions"></b-form-select>
        <b-form-input style="margin: 20px" v-model="newLoan.title" :placeholder="'Durée de l\'emprunt'" :min="1" :type="'number'"></b-form-input>
      </b-form>
    </div>
    <p style="margin: 20px">Note: La durée de l'emprunt est exprimée en jours. Si aucune valeur n'est définie, l'emprunt sera de 15 jours par défaut.</p>
    <b-button variant="outline-primary" @click="addLoan()">Ajouter un emprunt</b-button>
  </div>
</template>
<script>

import loans from "@/services/loans";
import users from "@/services/users";
import books from "@/services/books";

export default {
  name: 'Loans',
  data() {
    return {
      loans_fields: ['nomClient', 'bookId', 'dateEmprunt', 'dateRetour',  'actions'],
      bookOptions: [{ value: null, text: 'Choisissez le livre' }],
      clientOptions: [{ value: null, text: 'Choisissez l\'utilisateur' }],
      newLoan: {name:""},
      apiResponse: null,
      bookSelected: null,
      clientSelected: null
    }
  },

  methods: {
    getAllLoans() {
      const promises = [];
      loans.getAll().then(response => {
        return response;
      }).then((response) => {
        response.data.forEach((loan) => {
          promises.push(
            users.getById(loan.clientId).then((user) => {
              loan.nomClient = user.data.username;
              loan.dateEmprunt = loan['startDatetime'].split('T')[0];
              loan.dateRetour = loan['endDatetime'].split('T')[0];
              return loan;
            }));
        });
        Promise.all(promises).then(loans => this.apiResponse = loans);
      }).then(() => {
        users.getAll().then((response) => {response.data.map((user) => this.clientOptions.push({value:user._id, text:user.username})
        )}
      )}).then(() => {
        books.getAll().then((response) => {response.data.map((book) => this.bookOptions.push({value:book.publisherId, text:book.title})
            )}
      )}).catch((err) => console.log(err));
    },
    validateLoan() {
    },
    addLoan(){
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
          this.getAllLoans()
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
