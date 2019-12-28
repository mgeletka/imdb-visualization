<template>
    <div class="container">
        <div class="filter-item">
            <label class="item-name"> Director </label>
            <Dropdown
                    :options="$store.state.directors"
                    v-on:selected="validateSelection"
                    v-on:filter="getDropdownValues"
                    :disabled="false"
                    :maxItem="5"
                    placeholder="Please select a director">
            </Dropdown>
        </div>
        <div class="filter-item">
            <label class="item-name">Release year</label>
            <br>

            <ejs-slider v-model="releaseYearRange" :value="releaseYearRange" :min='$store.state.minYearOfMovie' :max='$store.state.maxYearOfMovie' :tooltip='{ isVisible: true }'
                        :ticks="{ placement: 'After', largeStep: 10, smallStep: 1, showSmallTicks: true }" type='Range'/>
        </div>

        <div class="filter-item">
            <label class="item-name">Numbers of filter movies
                <ejs-slider id='format' :value='numberOfMovies' v-model="numberOfMovies" :min="2" :max="20" :step="1"
                            :tooltip="{ isVisible: true }" :ticks="{ placement: 'After', largeStep: 2, smallStep: 1, showSmallTicks: true }"/>
            </label>
        </div>


        <div class="filter-item">
            <label class="item-name"> Genres: </label>
            <label>
                Check all
                <input type="checkbox" @click="checkAll" v-model="isCheckedAll">
            </label>
            <div class="genres">
                <div v-for="genre in $store.state.genres" :key="genre" class="genre">
                    <label>
                        {{ genre }}
                        <input type="checkbox" :value="genre" @change='updateCheckall' v-model="checkedGenres">
                    </label>
                </div>
            </div>
        </div>

        <div class="filter-item">
            <div class="button_cont" align="center"><a class="filter-button" @click="showMovies()" target="_blank" > Show movies! </a></div>
        </div>

    </div>
</template>

<script>
  import Dropdown from 'vue-simple-search-dropdown';

  export default {
    name: "MovieFilter",
    data: function() {
      return {
        releaseYearRange: [1916,2016],
        numberOfMovies: 10,
        checkedGenres: [],
        selectedDirector: null,
        isCheckedAll: false,
      };
    },
    components: {
      Dropdown,
    },
    methods:{
      validateSelection(selectedOption){
        this.selectedDirector = selectedOption.name;
      },
      getDropdownValues(value){
        // eslint-disable-next-line no-console
        console.log(value);
        return "None";
      },

      checkAll(){
        this.isCheckedAll = !this.isCheckedAll;
        this.checkedGenres = [];
        if(this.isCheckedAll){ // Check all
          this.$store.state.genres.forEach(genre => {
            this.checkedGenres.push(genre);
          });
        }
      },
      showMovies(){
        const filter = {
          director: this.selectedDirector,
          releaseDate: {
            min: this.releaseYearRange[0],
            max: this.releaseYearRange[1],
          },
          genres: this.checkedGenres,
          numberOfMovies: this.numberOfMovies
        };
        // eslint-disable-next-line no-console
        console.log(filter);
        this.$store.commit('SHOW_MOVIES', filter);

      },
      updateCheckall: function(){
        this.isCheckedAll = this.checkedGenres.length === this.$store.state.genres.length;
      }
    },

  }
</script>

<style>
    .genres{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .genre {
        margin-right: 10px;
    }

    .filter-item{
        margin-bottom: auto;
        margin-left: 20px;
        margin-right: 20px;
    }

    .container {
        display: flex;
        flex-direction: column;
    }

    .item-name {
        font-weight: bold;
    }

    .filter-button {
        color: #fff !important;
        text-transform: uppercase;
        text-decoration: none;
        background: #ed3330;
        padding: 20px;
        border-radius: 5px;
        display: inline-block;
        border: none;
        transition: all 0.4s ease 0s;
    }

    .filter-button:hover {
        background: #434343;
        letter-spacing: 1px;
        -webkit-box-shadow: 0 5px 40px -10px rgba(0,0,0,0.57);
        -moz-box-shadow: 0 5px 40px -10px rgba(0,0,0,0.57);
        box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
        transition: all 0.4s ease 0s;
        cursor: pointer;
    }

</style>