<template>
  <div class="Status">
    <main role="main">

      <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">WB Monitor update</h1>
          <p>Use filters to find the beer you want to update status on. There is one button for each status. Just click the status you want the beer to have. Current status is marked with grey color</p>
          <TimeFilter v-if="!storeIsLoading" />
          <RoomFilter v-if="!storeIsLoading" />

        </div>
      </section>
      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row">
            <div class="col-xs-12">

            </div>
          </div>

          <div class="row">

            <div class="col-md-4" v-for="(beer, index) in beers" :item="beer" :key="index">
              <div class="card mb-4 box-shadow">
                <div class="card-body">
                  <p class="card-text">{{ beer.name }}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary" :class="{ 'active': beer.beerStatus === ''}">Hide</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary" :class="{ 'active': beer.beerStatus === 'ON TAP'}">ON TAP</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary" :class="{ 'active': beer.beerStatus === 'EMPTY'}">EMPTY</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary" :class="{ 'active': beer.beerStatus === 'CANCALED'}">CANCELLED</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>    
  </div>
</template>
<script>
import RoomFilter from '@/components/RoomFilter'
import TimeFilter from '@/components/TimeFilter'


export default {
  name: "Room",
  components: {
    RoomFilter,
    TimeFilter
  },

  props: {},
  computed: {
      beers() {
        return this.$store.getters.GetBeersForList;
      },
      storeIsLoading() {
          return this.$store.state.isLoading;
      }
  },
  mounted() {
      this.$store.dispatch('fetchBeers');
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    background-color: #fff;
}
</style>
