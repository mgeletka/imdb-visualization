<template>
    <div style="height: 100%; width: 100%">
        <div>
            Movie Title: {{ $store.state.selectedMovie.title }}
            <br>
            Director: {{ $store.state.selectedMovie.director }}
            <br>
            Imdb score: {{ $store.state.selectedMovie.imdbScore }}
            <br>
            Actors: {{ $store.state.selectedMovie.actors }}
            <br>
            Plot: {{ movie.plot }}
        </div>
        <img :src="$store.state.selectedMovie.posterUrl" width="120" height="240">

    </div>
</template>

<script>
  export default {
    props: {
      movie: Object,
    },
    name: "MovieDetail"
  }
</script>

<style scoped>

</style>