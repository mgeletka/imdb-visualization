<template>
  <div id="app">
    <MovieFilter class="filter"/>
    <Histogram class="histogram"/>
    <PieChart class="pie-chart"/>
    <MovieDetail class="movie_detail"/>
  </div>
</template>

<script>
  import MovieFilter from "./components/MovieFilter";
  import Histogram from "./components/Histogram";
  import PieChart from "./components/PieChart";
  import MovieDetail from "./components/MovieDetail";

  export default {
  name: 'app',
  components: {
    MovieDetail,
    PieChart,
    Histogram,
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
  grid-template-rows: [row1-start] 60% [row1-end] 40%  [last-row];
  height: 100vh;
  width: 100vw;
}

  .filter{
    grid-column-start: first;
    grid-column-end: line2;
    grid-row-start: row1-start;
    grid-row-end: last-row;
    background-color: #cfcdc1;
  }

  .histogram{
    grid-column-start: line2;
    grid-column-end: line3;
    grid-row-start: row1-start;
    grid-row-end: row1-end;
    background-color: #cf0d0e;
  }

  .pie-chart{
    grid-column-start: line3;
    grid-column-end: last-line;
    grid-row-start: row1-start;
    grid-row-end: row1-end;
    background-color: #0c6b05;
  }

  .movie_detail{
    grid-column-start: line2;
    grid-column-end: liner3;
    grid-row-start: row1-end;
    grid-row-end: last-row;
    background-color: #455a6d;
  }





</style>
