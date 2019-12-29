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
  moviesToVisualize.sort((a, b) => {return parseFloat(b.imdb_score) - parseFloat(a.imdb_score)});

  return moviesToVisualize.slice(0, filter.numberOfMovies);

}

function getMovieDetail(state, movie) {
  const url_without_prefix = movie.movie_imdb_link.substr(26);
  const imdb_id = url_without_prefix.substr(0,  url_without_prefix.indexOf("/"));

  axios.get(`http://${window.location.hostname}:${state.serverPort}/get_movie_detail`, {
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
        console.log(response.data);
        state.selectedMovie.plot = response.data.movieDetail.Plot;
        state.selectedMovie.actors = response.data.movieDetail.Actors;
        state.selectedMovie.posterUrl = response.data.movieDetail.Poster;
        state.selectedMovie.awards = response.data.movieDetail.Awards;
        state.selectedMovie.released = response.data.movieDetail.Released;

      }
    })
    .catch(function () {
      state.errorGettingMovieDetail = true;
    });

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
      numberOfMovies: 20,
    },
    data: null,
    genres: [],
    directors: [],
    minYearOfMovie: null,
    maxYearOfMovie: null,
    moviesToVisualize: [],
    selectedMovie: {
      title: "",
      director:"",
      imdbScore: 0,
      plot: "",
      actors: "",
      awards: "",
      released: "",
      posterUrl: null,
    },
    errorGettingMovieDetail: false,
    serverPort: window.location.port,
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
      state.directors.sort();
      state.genres.sort();

      state.filter.genres = genres;
      state.moviesToVisualize = getMoviesToVisualize(state.data, state.filter);
      state.selectedMovie.title = state.moviesToVisualize[0].movie_title;
      state.selectedMovie.imdbScore = state.moviesToVisualize[0].imdb_score;
      state.selectedMovie.director = state.moviesToVisualize[0].director_name;
      getMovieDetail(state, state.moviesToVisualize[0])
    });
  },
    SHOW_MOVIES(state, filter) {
      // eslint-disable-next-line no-console
      console.log(filter);
      state.filter = filter;
      state.moviesToVisualize = getMoviesToVisualize(state.data, filter);

    },

    UPDATE_MOVIE_DETAIL(state, movie) {
      getMovieDetail(state, movie)

    }

}
,
actions: {
}
,
})
;
