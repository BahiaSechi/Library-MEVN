<template>
  <div>
    <h2>LISTE DES EMPRUNTS</h2>
    <div style="margin-top: 50px">
      <b-table :items="apiResponse" :fields="loans_fields" striped hover>
        <template #cell(actions)="row">
          <b-button variant="success" size="sm" @click="returnLoan(row.item.id)" class="mr-2" data-toggle="tooltip" data-placement="top" title="Valider le retour du livre">
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
        <b-form-input style="margin: 20px" v-model="durationSelected" :placeholder="'Durée de l\'emprunt'" :min="1" :type="'number'"></b-form-input>
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
      loans_fields: ['nomClient', 'titreLivre', 'dateEmprunt', 'dateRetour',  'actions'],
      bookOptions: [{ value: null, text: 'Choisissez le livre', disabled: true}],
      clientOptions: [{ value: null, text: 'Choisissez l\'utilisateur', disabled: true }],
      newLoan: {clientId:"", bookId:"", duration:""},
      apiResponse: [],
      bookSelected: null,
      clientSelected: null,
      durationSelected: null
    }
  },

  methods: {
    getAllLoans() {
      this.bookOptions = [{ value: null, text: 'Choisissez le livre', disabled: true}];
      this.clientOptions = [{ value: null, text: 'Choisissez l\'utilisateur', disabled: true }];
      const promises = [];
      loans.getAll().then(response => {
        return response;
      }).then((response) => {
        response.data.forEach((loan) => {
          promises.push(
              books.getById(loan.bookId).then((book) => {
                loan.titreLivre = book.data.title;
                loan.dateEmprunt = loan['startDatetime'].split('T')[0];
                loan.dateRetour = loan['endDatetime'].split('T')[0];
                return loan;
              }).then((loan) => {
                users.getById(loan.clientId).then((user) => {
                  loan.nomClient = user.data.username
                  this.apiResponse.push(loan);
                  return loan;
                })
              })
          );
        });
      Promise.all(promises);
      }).then(() => {
        users.getAll().then((response) => {response.data.map((user) => this.clientOptions.push({value:user._id, text:user.username})
        )}
      )}).then(() => {
        books.getAll().then((response) => {response.data.map((book) => {
          if(book.state === "AVAILABLE"){
            this.bookOptions.push({value:book.id, text:book.title})}
          }
        )}
      )}).catch((err) => console.log(err));
    },
    returnLoan(loanId) {
      loans.return(loanId).then(() => {
        this.$notify({
          group:'actions',
          text: '<b>Emprunt archivé!</b>',
          type: 'success',
          position: 'bottom center'
        });
        window.location.reload();
      });
    },
    addLoan(){
      if(!this.clientSelected || !this.bookSelected) {
        this.$notify({
          group:'actions',
          text: `<b>Il faut renseigner au moins un livre et un utilisateur. </b>`,
          type: 'error',
          position: 'bottom center'
        });
      } else {
        this.newLoan.clientId = this.clientSelected;
        this.newLoan.bookId = this.bookSelected;
        const daysInHours = this.durationSelected ? parseInt(this.durationSelected) * 24 : 360;
        this.newLoan.duration = "PT" + daysInHours + "H"
        loans.add(this.newLoan).then(() => {
          this.$notify({
            group: 'actions',
            text: '<b>Emprunt bien ajouté !</b>',
            type: 'success',
            position: 'bottom center'
          });
          this.newLoan.name = '';
          window.location.reload();
        })
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
        window.location.reload();
      });
    }
  },
  mounted() {
    this.getAllLoans()
    if (this.$cookies.get("role") === "CONSULT_ROLE"){
      this.$router.push("books");
      this.$notify({
        group:'actions',
        text: '<b>Vous n\'avez pas la permission d\'accèder à cette page.</b>',
        type: 'error',
        position: 'bottom center'
      });
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
