import Vue from 'vue';
import Vuex from 'vuex';
import * as d3 from "d3";
import axios from 'axios';



Vue.use(Vuex);
function movieSatisfyAnyGenre(movie, genres) {
  let satisfyGenre = false;
  genres.forEach(genre => {
    if (movie.genres.includes(genre)){
      satisfyGenre = true;
    }
  });
  return satisfyGenre;

}
function getMoviesToVisualize(data, filter) {
  let moviesToVisualize = [];
  data.forEach(movie => {
      if ((!filter.director || movie.director_name === filter.director) && parseInt(movie.title_year) >= filter.releaseDate.min
        && parseInt(movie.title_year) <= filter.releaseDate.max && movieSatisfyAnyGenre(movie, filter.genres)){
        moviesToVisualize.push(movie);
      }
  });
  moviesToVisualize.sort((a, b) => {return parseFloat(a.imdb_score) - parseFloat(b.imdb_score)});

  return moviesToVisualize.slice(0, filter.numberOfMovies);

}

export default new Vuex.Store({
  state: {
    filter: {
      releaseDate: {
        min: 0,
        max: 3000,
      },
      director: null,
      genres: [],
      numberOfMovies: 10,
    },
    data: null,
    genres: [],
    directors: [],
    minYearOfMovie: null,
    maxYearOfMovie: null,
    moviesToVisualize: [],
    selectedMovie: null,
    errorGettingMovieDetail: false,
  },
  mutations:{
  LOAD_DATA(state)  {
    d3.csv("./movie_metadata.csv").then(function (data) {
      let genres = new Set();
      let directors = new Set();
      state.data = data;
      state.minYearOfMovie = parseInt(data[0].title_year);
      state.maxYearOfMovie = parseInt(data[0].title_year);
      state.selectedMovie = data[0];
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
      // eslint-disable-next-line no-console
      console.log(state.directors);
      // eslint-disable-next-line no-console
      console.log(state.genres);
      state.directors.sort();
      state.genres.sort();
      state.moviesToVisualize = getMoviesToVisualize(state.data, state.filter)
    });
  },
    SHOW_MOVIES(state, filter) {
      // eslint-disable-next-line no-console
      console.log(filter);
      state.filter = filter;
      state.moviesToVisualize = getMoviesToVisualize(state.data, filter);
    },

    UPDATE_MOVIE_DETAIL(state, movie) {
      const url_without_prefix = movie.movie_imdb_link.substr(26);
      const imdb_id = url_without_prefix.substr(0,  url_without_prefix.indexOf("/"));

      axios.get(`http://${window.location.hostname}:3003/get_movie_detail`, {
        params: {
          imdb_id: imdb_id,
        }
      })
        .then(function (response) {
          // eslint-disable-next-line no-console
          console.log(response);
          if (response.status !== 200) {
            state.errorGettingMovieDetail = true;
          } else {
            // eslint-disable-next-line no-console
            console.log("Succesfully get movie detail");
          }
        })
        .catch(function () {
          state.errorGettingMovieDetail = true;
        });

    }

}
,
actions: {
}
,
})
;
