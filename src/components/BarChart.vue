<template>
    <div class="barchart-wrapper" ref="barchartWrapper">
        <div v-if="moviesToVisualize" id="barchart_div" ref="barcharDiv" class="barchart"></div>
        <svg style="width:100%;height:100%;">
            <rect class="bar" v-for="(movie, index) in moviesToVisualize" :key="movie.movie_title" :x="barWidth * (index+1)" :y="canvasHeight - getHeight(movie) - 15"
                  :height="getHeight(movie)" :width="barWidth - 10" @click="getMovieDetail(movie)" >
<!--                <animate attributeName="height" :from="0" :to="getHeight(movie)" dur="3s" fill="freeze"/>-->
<!--                <animate attributeName="y" :from="canvasHeight - getHeight(movie) - 15" :to="canvasHeight - 15" dur="3s" fill="freeze"/>-->

            </rect>
        </svg>
    </div>
</template>

<script>
  // import * as d3 from "d3";


  export default {
    name: "BarChart",
    data(){
      return{
        barWidth: 60,
      };
    },
    methods: {

      drawBarChart() {
        // if(this.barChartArea){
        //   this.barChartArea.remove();
        // }

        // this.barChartArea = d3.select("#barchart_div").append("svg")
        //   .attr("width", d3.select("#barchart_div").node().clientWidth)
        //   .attr("height", d3.select("#barchart_div").node().clientHeight);
        //
        // // let thisCanvasWidth = barChartArea.node().clientWidth;
        // let canvasHeight = this.barChartArea.node().clientHeight;
        // let barWidth = 60;
        //
        // let i = 0;
        // let min_value = this.moviesToVisualize[this.moviesToVisualize.length -1].imdb_score;
        // this.moviesToVisualize.forEach(movie => {
        //   let thisHeight = ((movie.imdb_score - min_value + 0.1) / (10 - min_value + 0.1)) * canvasHeight ;
        //
        //   const self = this;
        //
        //   // const myTip = tip
        //   //   .attr('class', 'd3-tip')
        //   //   .offset([-10, 0])
        //   //   .html(function(d) {
        //   //     return "<strong>Frequency:</strong> <span style='color:red'>" + d.frequency + "</span>";
        //   //   });
        //
        //   // var tip = d3.tip()
        //   //   .attr('class', 'd3-tip')
        //   //   .offset([-10, 0])
        //   //   .html(function(d) {
        //   //     return "<strong>Frequency:</strong> <span style='color:red'>" + d.frequency + "</span>";
        //   //   });
        //
        //
        //   this.barChartArea.append('rect')
        //     .on("click", function() { self.getMovieDetail(movie); })
        //     // .on('mouseover', myTip.show)
        //     // .on('mouseout', myTip.hide)
        //     .attr('x', (barWidth * i))
        //     .attr('y', canvasHeight - 15)
        //     .attr('width', barWidth-10)
        //     .attr('height', 0)
        //     // .attr('fill', 'red')
        //     .attr("class", "bar")
        //           .transition() //Animation function
        //     .duration(1000) //Duration in ms
        //     .attr('y', canvasHeight - thisHeight - 15)
        //     .attr('height', thisHeight*2.5);
        //
        //
        //   i++;
        // });
      },

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

    },
    mounted() {
      this.drawBarChart()
    },
    computed: {
      moviesToVisualize() {
        return this.$store.state.moviesToVisualize;
      },
      minValue(){
        return this.moviesToVisualize[this.moviesToVisualize.length -1].imdb_score;
      },
      canvasHeight(){
        return this.$refs.barchartWrapper ? this.$refs.barchartWrapper.clientHeight : 0;
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
        margin-right: 15px;
    }

    .bar:hover {
        fill: #354a5e;
        cursor: pointer;
    }

</style>