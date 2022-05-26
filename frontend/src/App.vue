<template>
  <div style="display: flex; align-items:center; flex-direction: column;">
    <h2>HZFlix</h2>
    <p>Most Watched Films</p>
    <table>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>View count</th>
      </tr>
      <tr v-for="film in sortedFilms" :key="film.id">
        <td>{{ film.id }}</td>
        <td>{{ film.name }}</td>
        <td>{{ film.views }}</td>
        <td><button @click="showDetails(film.id)">Details</button></td>
      </tr>
    </table>
    <br>
    <br>
    <div style="display: flex; align-items:center; flex-direction: column;" v-if="showDetail" id="detailSection">
      <h1>{{filmDetail.name}}</h1>
      <p>{{filmDetail.description}}</p>
      <table>
        <tr>
          <td>Release Year: </td>
          <td>{{filmDetail.releaseYear}}</td>
        </tr>
        <tr>
          <td>Length: </td>
          <td>{{filmDetail.length}}</td>
        </tr>
        <tr>
          <td>Rating: </td>
          <td>{{filmDetail.rating}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const app = {
  name: 'App',
  data: function () {
    return {
      films: [],
      showDetail: false,
      filmDetail: {
        name: '',
        description: '',
        releaseYear: 0,
        length: 0,
        rating: '',
      }
    }
  },
  methods: {
    showDetails(filmId) {
      axios.get('http://localhost:3000/detail/' + filmId)
      .then(response => {
        const data = response.data;
        this.filmDetail.name = data.name;
        this.filmDetail.description = data.description;
        this.filmDetail.releaseYear = data.releaseyear.toString();
        this.filmDetail.length = data.length;
        this.filmDetail.rating = data.rating;

        this.showDetail = true;
      })
      .catch(error => {
        console.log(error);
      });
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
