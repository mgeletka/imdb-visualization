<template>
  <div id="app">
    <MovieFilter class="filter"/>
    <BarChart class="barchart"/>
    <MovieDetail class="movie_detail" :movie="$store.state.selectedMovie"/>
  </div>
</template>

<script>
  import MovieFilter from "./components/MovieFilter";
  import BarChart from "./components/BarChart";
  import MovieDetail from "./components/MovieDetail";

  export default {
  name: 'app',
  components: {
    MovieDetail,
    BarChart,
    MovieFilter,
  },
  created() {
    this.$store.commit('LOAD_DATA')
  }
}
</script>

<style>
  @import "../node_modules/@syncfusion/ej2-base/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
  @import "../node_modules/@syncfusion/ej2-vue-inputs/styles/material.css";

  body {
    margin: 0;
  }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  display: grid;
  grid-template-columns: [first] 20% [line2] 50% [line3] 30% [last-line];
  grid-template-rows: [row1-start] 40% [row1-end] 60%  [last-row];
  height: 100vh;
  width: 100vw;
}

  .filter{
    grid-column-start: first;
    grid-column-end: line2;
    grid-row-start: row1-start;
    grid-row-end: last-row;
    background: rgb(255,255,255);
    background: linear-gradient(281deg, rgba(255,255,255,1) 0%, rgba(207,205,193,1) 100%);;
  }

  .barchart{
    grid-column-start: line2;
    grid-column-end: last-line;
    grid-row-start: row1-start;
    grid-row-end: row1-end;
    background: rgb(255,255,255);
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(222,222,222,1) 100%);  }


  .movie_detail{
    grid-column-start: line2;
    grid-column-end: liner3;
    grid-row-start: row1-end;
    grid-row-end: last-row;
    background: rgb(255,255,255);
    background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(69,90,109,1) 100%); }





</style>
