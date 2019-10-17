<template>
    <div class="page-search-and-filter page-standard page">
        <div class="container">
          <div class="main-section">
            <div class="beer-list">
              <div class="filter-buttons">
                <TimeFilter v-if="!storeIsLoading" />
                <TypeFilter  v-if="!storeIsLoading" />
                <RoomFilter v-if="!storeIsLoading" />
                <BreweryFilter v-if="!storeIsLoading" />
              </div>
              <BeerList v-if="!storeIsLoading" />
            </div>
          </div>
        </div>
    </div> 
</template>

<script>
import TimeFilter from '@/components/TimeFilter'
import TypeFilter from '@/components/TypeFilter'
import RoomFilter from '@/components/RoomFilter'
import BreweryFilter from '@/components/BreweryFilter'
import BeerList from '@/components/BeerList'

export default {
  name: 'BeerFilterPage',
  components: {
    TimeFilter,
    TypeFilter,
    RoomFilter,
    BreweryFilter,
    BeerList
  },
  mounted() {


      this.$store.dispatch('fetchBeers');
  },
  computed: {
      storeIsLoading() {
          return this.$store.state.isLoading;
      }
  }
}
</script>
<style scoped>
    .page-search-and-filter .main-section{
      min-height: 1200px;
    }
    body{
      background-color: #FBF9EB;
      background-image: none;
    }

</style>