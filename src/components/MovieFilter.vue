<template>
    <div class="container">
        <div class="filter-item">
            <label class="item-name"> Director </label>
            <Dropdown
                    :options="$store.state.directors"
                    v-on:selected="validateSelection"
                    v-on:filter="getDropdownValues"
                    :disabled="false"
                    name="director"
                    :maxItem="5"
                    placeholder="Please select a director">
            </Dropdown>
        </div>
        <div class="filter-item">
            <label class="item-name">Release year</label>
            <br>
            <label>
                Min year
                <input  type="text" :value="rangevalue[0]">
            </label>
            <br>
            <label>
                Max year
                <input type="text" :value="rangevalue[1]">
            </label>
            <ejs-slider v-model="rangevalue"  :min='$store.state.minYearOfMovie' :max='$store.state.maxYearOfMovie' :tooltip='{ isVisible: true }'
                        :ticks="{ placement: 'After', largeStep: 10, smallStep: 1, showSmallTicks: true }" type='Range'/>
        </div>

        <div class="filter-item">

            <label class="item-name">Numbers of filter movies
                <br>
                <input type="text" :value="numberOfMovies">
            </label>
            <ejs-slider id='format' :value='numberOfMovies' v-model="numberOfMovies" :min="2" :max="25" :step="1"
                        :tooltip="{ isVisible: true }" :ticks="{ placement: 'After', largeStep: 2, smallStep: 1, showSmallTicks: true }"/>
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

    </div>
</template>

<script>
  import Dropdown from 'vue-simple-search-dropdown';

  export default {
    name: "MovieFilter",
    data: function() {
      return {
        rangevalue: [1980,2000],
        numberOfMovies: 10,
        // limits: { enabled: true, minStart: this.$store.state.minYearOfMovie, minEnd: this.$store.state.minYearOfMovie, maxStart: this.$store.state.maxYearOfMovie, maxEnd: this.$store.state.maxYearOfMovie },
      checkedGenres: [],
        isCheckedAll: false,
      };
    },
    components: {
      Dropdown,
    },
    methods:{
      validateSelection(){
      },
      getDropdownValues(){
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
      updateCheckall: function(){
        // eslint-disable-next-line no-console
        console.log("Changed");
        this.isCheckedAll = this.checkedGenres.length === this.$store.state.genres.length;
      }
    },

  }
</script>

<style scoped>
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
        margin-left: 10px;
        margin-right: 15px;
    }

    .container {
        display: flex;
        flex-direction: column;
    }

    .item-name {
        font-weight: bold;
    }

</style>