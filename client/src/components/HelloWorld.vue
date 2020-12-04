<template>
  <div>
    {{apiResponse}}
  </div>
</template>

<script>

import books from '../services/authors'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      apiResponse: null
    }
  },
  mounted() {
    books.getAll().then(response => {
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
