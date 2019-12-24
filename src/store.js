import Vue from 'vue';
import Vuex from 'vuex';
import * as d3 from "d3";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filter: {
      releaseDate: {
        moviesFrom: null,
        moviesTo: null,
      },
      checkedGenres: [],
      director: null,
      typeOfMovie: null,
      numberOfMovies: 10,
    },
    data: null,
    genres: [],
    directors: [],
    minYearOfMovie: null,
    maxYearOfMovie: null,
  },
  mutations:{
  LOAD_DATA(state)  {
    d3.csv("./movie_metadata.csv").then(function (data) {
      let genres = new Set();
      let directors = new Set();
      state.data = data;
      state.minYearOfMovie = parseInt(data[0].title_year);
      state.maxYearOfMovie = parseInt(data[0].title_year);
      data.forEach((movie) =>{
        if(state.minYearOfMovie > parseInt(movie.title_year)){
          state.minYearOfMovie = movie.title_year
        }
        if(state.maxYearOfMovie < parseInt(movie.title_year)) {
          state.maxYearOfMovie = movie.title_year;
        }
        directors.add(movie.director_name);
        movie.genres.split("|").forEach((genre) => {
          genres.add(genre);
        })
      });
      state.genres = Array.from(genres);
      state.checkedGenres = [...state.genres];

      let i = 1;
      directors.forEach((director) => {
        state.directors.push({id: i, name: director});
        i++;
      });
      state.directors.push({id: i, name: "None"});
      // eslint-disable-next-line no-console
      console.log(state.directors);
      // eslint-disable-next-line no-console
      console.log(state.genres)
    });
  }
}
,
actions: {
}
,
})
;
