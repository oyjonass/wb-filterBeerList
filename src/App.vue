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
      },
  }
}
</script>
<style>
  .wb-logo-wrapper{
    position: relative;
  }
  .wb-logo-outer-circle {
    width: 140px;
    /*animation: rotate 1.4s linear infinite;
    -webkit-animation: rotate 1.4s linear infinite;
    -moz-animation: rotate 1.4s linear infinite;
    width:174px;
    height:174px;
    position: relative;*/
    animation-name: ckw;
    animation-duration: 45s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    position: absolute;
    top:-68px;
    left:-22px;
  }
  @keyframes ckw {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
  }
</style>