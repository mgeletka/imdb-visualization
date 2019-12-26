<template>
    <div class="barchart-wrapper">
        <div id="barchart_div" class="barchart"></div>
    </div>
</template>

<script>
  import * as d3 from "d3";
  // var tip = require("d3-tip");


  export default {
    name: "BarChart",
    data(){
      return{
        barChartArea: null,
      };
    },
    methods: {
      drawBarChart() {
        if(this.barChartArea){
          this.barChartArea.remove();
        }

        this.barChartArea = d3.select("#barchart_div").append("svg")
          .attr("width", d3.select("#barchart_div").node().clientWidth)
          .attr("height", d3.select("#barchart_div").node().clientHeight);

        // let thisCanvasWidth = barChartArea.node().clientWidth;
        let thisCanvasHeight = this.barChartArea.node().clientHeight;
        let thisBarWidth = 60;

        let i = 0;
        let min_value = this.moviesToVisualize[this.moviesToVisualize.length -1].imdb_score;
        this.moviesToVisualize.forEach(movie => {
          let thisHeight = ((movie.imdb_score - min_value + 0.1) / (10 - min_value + 0.1)) * thisCanvasHeight ;

          const self = this;
          //
          // const myTip = tip
          //   .attr('class', 'd3-tip')
          //   .offset([-10, 0])
          //   .html(function(d) {
          //     return "<strong>Frequency:</strong> <span style='color:red'>" + d.frequency + "</span>";
          //   });

          this.barChartArea.append('rect')
            .on("click", function() { self.getMovieDetail(movie); })
            // .on('mouseover', myTip.show)
            // .on('mouseout', myTip.hide)
            .attr('x', (thisBarWidth * i))
            .attr('y', thisCanvasHeight - 15)
            .attr('width', thisBarWidth-10)
            .attr('height', 0)
            // .attr('fill', 'red')
            .attr("class", "bar")
                  .transition() //Animation function
            .duration(1000) //Duration in ms
            .attr('y', thisCanvasHeight - thisHeight - 15)
            .attr('height', thisHeight*2.5);


          i++;
        });
      },

      getMovieDetail(movie){
        // eslint-disable-next-line no-console
        console.log("Inside click");
        this.$store.state.selectedMovie.title = movie.movie_title;
        this.$store.state.selectedMovie.director = movie.director_name;
        this.$store.state.selectedMovie.imdbScore = movie.imdb_score;

        this.$store.commit('UPDATE_MOVIE_DETAIL', movie)
      }

    },
    mounted() {
      this.drawBarChart()
    },
    computed: {
      moviesToVisualize() {
        return this.$store.state.moviesToVisualize;
      },
    },

    watch: {
      moviesToVisualize(newValue, oldValue) {
        if(oldValue !== newValue){
          this.drawBarChart();
        }
      },
    },

  }
</script>

<style>
    .barchart{
        margin:50px;
    }

    .bar {
        fill: #e91b1b;
    }

    .bar:hover {
        fill: #354a5e;
        cursor: pointer;
    }

</style>