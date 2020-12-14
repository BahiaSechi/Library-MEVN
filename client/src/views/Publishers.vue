<template>
  <div>
    <h2>LISTE DES EDITEURS</h2>
    <div style="margin-top: 50px">
      <b-table :items="apiResponse" :fields="publishers_fields" striped hover>
        <template #cell(actions)="row">
          <b-button variant="danger" size="sm" @click="deletePublisher(row.item.id)" class="mr-2">
            <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
          </b-button>
        </template>
      </b-table>
    </div>
    <div v-if="this.$cookies.get('role') === 'ADMINISTRATOR_ROLE' || this.$cookies.get('role') === 'CONTRIBUTOR_ROLE'" style="margin-top: 50px;">
      <b-form style="display: contents" inline>
        <b-form-input style="margin: 20px" v-model="newPublisher.name" :placeholder="'Hachette'" :type="'text'"></b-form-input>
        <b-button variant="outline-primary" @click="addPublisher()">Ajouter un éditeur</b-button>
      </b-form>
    </div>
  </div>

</template>

<script>

import publishers from '../services/publishers'

export default {
  name: 'Publishers',
  data() {
    return {
      publishers_fields: ['name', 'actions'],
      newPublisher: {name:""},
      apiResponse: null
    }
  },
  methods: {
    getAllPublishers() {
      publishers.getAll().then(response => {
        this.apiResponse = response.data
      });
    },
    addPublisher(){
      if(this.newPublisher.name === '') {
        this.$notify({
          group:'actions',
          text: `<b>Il faut renseigner au moins un nom d'éditeur. </b>`,
          type: 'error',
          position: 'bottom center'
        });
      } else {
        publishers.add(this.newPublisher).then(() => {
          this.$notify({
            group:'actions',
            text: '<b>Editeur bien ajouté !</b>',
            type: 'success',
            position: 'bottom center'
          });
          this.newPublisher.name = '';
          this.getAllPublishers();
        });
      }
    },
    deletePublisher(publisherId){
      publishers.remove(publisherId).then(() => {
        this.$notify({
          group:'actions',
          text: '<b>Editeur bien supprimé !</b>',
          type: 'success',
          position: 'bottom center'
        });
        this.getAllPublishers();
      });
    }
  },
  mounted() {
    this.getAllPublishers();
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
      this.publishers_fields.pop()
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