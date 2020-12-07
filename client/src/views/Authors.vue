<template>
  <div>
    <h2>LISTE DES AUTEURS</h2>
    <div>
      <b-table id="table" striped hover :items="apiResponse" :fields="author_fields"></b-table>
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
      apiResponse: null,
    }
  },
  mounted() {
    authors.getAll().then(response => {
      this.apiResponse = response.data
    })
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
