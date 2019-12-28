<template>
    <div class="barchart-wrapper" ref="barchartWrapper">

        <div v-if="moviesToVisualize" id="barchart_div" ref="barcharDiv" class="barchart"></div>
        <svg style="width:100%;height:100%;">
            <rect class="bar" v-for="(movie, index) in moviesToVisualize" :key="movie.movie_title" :x="barWidth * (index+1)" :y="canvasHeight - getHeight(movie)"
                  :height="getHeight(movie)" :width="barWidth - 10" @click="getMovieDetail(movie)"  v-tooltip.top-center="getTooltipText(movie)"
            >
<!--                <animate attributeName="height" from="0" :to="getHeight(movie)" dur="5s" fill="freeze"/>-->
<!--                <animate attributeName="y" :from="canvasHeight- 15" :to="canvasHeight - getHeight(movie) - 15" dur="5s" fill="freeze"/>-->
            </rect>
        </svg>
    </div>
</template>

<script>


  export default {
    name: "BarChart",
    data(){
      return{
        barWidth: 60,
      };
    },
    methods: {
      getMovieDetail(movie){
        // eslint-disable-next-line no-console
        console.log("Inside click");
        this.$store.state.selectedMovie.title = movie.movie_title;
        this.$store.state.selectedMovie.director = movie.director_name;
        this.$store.state.selectedMovie.imdbScore = movie.imdb_score;

        this.$store.commit('UPDATE_MOVIE_DETAIL', movie)
      },
      getHeight(movie){
        return movie.imdb_score / 10 * this.canvasHeight;
      },
      getTooltipText(movie){
        return  movie.movie_title + "<br>" + "IMDB score: " + movie.imdb_score;
      }

    },
    computed: {
      moviesToVisualize() {
        return this.$store.state.moviesToVisualize;
      },
      canvasHeight(){
        return this.$refs.barchartWrapper ? this.$refs.barchartWrapper.clientHeight : 0;
      },
    },


  }
</script>

<style type="scss">
    .barchart{
        margin:50px;
    }

    .bar {
        fill: #e91b1b;
        margin-right: 15px;
    }

    .bar:hover {
        fill: #354a5e;
        cursor: pointer;
    }
    .tooltip {
        display: block !important;
        z-index: 10000;
    }

    .tooltip .tooltip-inner {
        background: black;
        color: white;
        border-radius: 16px;
        padding: 5px 10px 4px;
    }

    .tooltip .tooltip-arrow {
        width: 0;
        height: 0;
        border-style: solid;
        position: absolute;
        margin: 5px;
        border-color: black;
        z-index: 1;
    }

    .tooltip[x-placement^="top"] {
        margin-bottom: 5px;
    }

    .tooltip[x-placement^="top"] .tooltip-arrow {
        border-width: 5px 5px 0 5px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        bottom: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
    }

    .tooltip[x-placement^="bottom"] {
        margin-top: 5px;
    }

    .tooltip[x-placement^="bottom"] .tooltip-arrow {
        border-width: 0 5px 5px 5px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-top-color: transparent !important;
        top: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
    }

    .tooltip[x-placement^="right"] {
        margin-left: 5px;
    }

    .tooltip[x-placement^="right"] .tooltip-arrow {
        border-width: 5px 5px 5px 0;
        border-left-color: transparent !important;
        border-top-color: transparent !important;
        border-bottom-color: transparent !important;
        left: -5px;
        top: calc(50% - 5px);
        margin-left: 0;
        margin-right: 0;
    }

    .tooltip[x-placement^="left"] {
        margin-right: 5px;
    }

    .tooltip[x-placement^="left"] .tooltip-arrow {
        border-width: 5px 0 5px 5px;
        border-top-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        right: -5px;
        top: calc(50% - 5px);
        margin-left: 0;
        margin-right: 0;
    }

    .tooltip.popover .popover-inner {
        background: #f9f9f9;
        color: black;
        padding: 24px;
        border-radius: 5px;
        box-shadow: 0 5px 30px rgba(black, .1);
    }

    .tooltip.popover .popover-arrow {
        border-color: #f9f9f9;
    }

    .tooltip[aria-hidden='true'] {
        visibility: hidden;
        opacity: 0;
        transition: opacity .15s, visibility .15s;
    }

    .tooltip[aria-hidden='false'] {
        visibility: visible;
        opacity: 1;
        transition: opacity .15s;
    }



</style>