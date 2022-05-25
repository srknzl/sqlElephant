<template>
  <div>
    <div v-for="film in sortedFilms" :key="film.id">
      <p>ID: {{ film.id }}</p>
      <p>Name: {{ film.name }}</p>
      <p>View count: {{ film.views }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const app = {
  name: 'App',
  data: function () {
    return {
      films: []
    }
  },
  computed: {
    sortedFilms() {
      const sortedFilms = [...this.films];
      sortedFilms.sort((film1, film2) => film2.views - film1.views);
      return sortedFilms;
    }
  },
  mounted() {
    setInterval(() => {
      axios.get('http://localhost:3000')
          .then(response => {
            this.films = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    }, 500);
  }
};
export default app;
1

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
