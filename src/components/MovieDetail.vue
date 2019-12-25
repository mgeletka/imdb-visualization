<template>
    <div style="height: 100%; width: 100%">
        <div>
            Movie Title: {{ movie.movie_title }}
            <br>
            Imdb score: {{ movie.imdb_score }}

        </div>

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