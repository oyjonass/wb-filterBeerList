<template>
  <div id="app" class="beer-list">
    <div class="filter-buttons">
      <TimeFilter v-if="!storeIsLoading" />
      <TypeFilter  v-if="!storeIsLoading" />
      <RoomFilter v-if="!storeIsLoading" />
      
    </div>
    <BeerList v-if="!storeIsLoading" />
  </div>
</template>

<script>
import TimeFilter from './components/TimeFilter'
import TypeFilter from './components/TypeFilter'
import RoomFilter from './components/RoomFilter'
import BeerList from './components/BeerList'

export default {
  name: 'app',
  components: {
    TimeFilter,
    TypeFilter,
    RoomFilter,
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
<style>
</style>