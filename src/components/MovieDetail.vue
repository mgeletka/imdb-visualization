<template>
    <div class="movie-detail-container">
        <div class="movie-detail-text">

            <p class="title"> {{ movie.title }}</p>
            <br>
            <p>
                <span class="movie_detail-item-name"> Director: </span> {{ movie.director }}
            </p>
            <p>
                <span class="movie_detail-item-name">Released:</span> {{ movie.released }}
            </p>
            <br>
            <p>
                 <span class="movie_detail-item-name">Imdb score:</span> {{ movie.imdbScore }}
            </p>
            <p>
                <span class="movie_detail-item-name">Awards:</span> {{ movie.awards }}
            </p>
            <br>
            <p>
                 <span class="movie_detail-item-name">Actors:</span> {{ movie.actors }}
            </p>
            <p>
                 <span class="movie_detail-item-name">Plot:</span> {{ movie.plot }}
            </p>
        </div>
        <div>

        </div>
        <div class="movie_detail-image">
            <img :src="movie.posterUrl">
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
    .title{
        font-weight: bold;
        font-size: xx-large;
    }

    .movie-detail-container{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: flex-start;
    }

    .movie-detail-text{
        margin-left: 20px;
    }

    .movie_detail-image{
        margin: 20px;
    }

    .movie_detail-item-name{
        font-weight: bold;
    }

    p{
        font-size: large;
    }

</style>