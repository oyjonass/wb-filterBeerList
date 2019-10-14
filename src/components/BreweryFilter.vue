<template>
  <div>
    <div class="buttons-brewery">
      <div class="left label">Brew</div>
      <form>
        <div class="form-group">
          <label for="exampleFormControlSelect2" class="d-block d-sm-none">Brewery</label>
          <select v-model="selectedBrewery" class="form-control selectpicker" id="exampleFormControlSelect2">
            <option value="">All breweries</option>
            <option v-for="(brewery, brewindex) in getBrewerys" :key="brewindex" :value="brewery.name">{{ brewery.name }} ({{ brewery.count }})</option>
          </select>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
var _ = require("lodash");

export default {
  name: "BreweryFilter",
  props: {},
  data() {
    return {
      selectedBrewery: '',
    };
  },
  computed: {
    getBrewerys() {
      const beers = this.beers;
      let breweryData = _.chain(beers)
        .filter("breweryName")
        .sortBy("breweryName")
        .map("breweryName")
        .countBy()
        .value();
      let array = [];
      let index = 0;
      _.forEach(breweryData, function(value, key) {
        const breweryName = key;
        const count = _.filter(beers, function(beer) {
          if (beer.breweryName == null) {
            return 0;
          }
          return beer.breweryName.indexOf(breweryName) > -1;
        }).length;

        index++;

        const obj = {
          id: index,
          name: breweryName,
          disabled: count > 0 ? false : true,
          count: count
        };
        array.push(obj);
      });
      return array;
    },
    beers() {
      return this.$store.getters.GetBeersForBrewery;
    },
    storeSearchBrewery() {
      return this.$store.state.searchBrewery;
    }
  },
  watch: {
    storeSearchBrewery: function() {
      this.selectedBrewery = this.storeSearchBrewery;
    },
    $route(to) {
      // check if we have something in querysting
      const currentQueryString = this.getQueryStringFilter(to);
      if (this.selectedBrewery !== currentQueryString) {
        this.selectedBrewery = currentQueryString;
      }
    },
    selectedBrewery: function() {
      this.$store.commit("setSearchBrewery", this.selectedBrewery);
      const currentQueryString = this.getQueryStringFilter(this.$route);
      if (this.selectedBrewery !== currentQueryString) {
        // We need to update querystring

        // Read current querystring (all of it), we are about to modify it
        const query = Object.assign({}, this.$route.query);
        // We delete querystring values used by this component if any (all languages)
        delete query.brewery;

        if (this.selectedBrewery.length < 1) {
          this.$router.replace({ query });
        } else {
          const encodedInput = encodeURI(this.selectedBrewery);
          let textQs = { brewery: encodedInput };
          const queryWithNewSearch = Object.assign(textQs, query);
          this.$router.replace({ query: queryWithNewSearch });
        }
      }
    }
  },
  created() {
    // Fetch querystring value on startup
    const currentQueryString = this.getQueryStringFilter(this.$route);
    // We compare the arrays if not equal we update model array
    if (this.selectedBrewery !== currentQueryString) {
      this.selectedBrewery = currentQueryString;
    }
  },
  methods: {
    getQueryStringFilter(qs) {
      // Check if we have kategori or category in querystring
      if (qs.query.brewery) {
        return decodeURI(qs.query.brewery);
      }
      return '';
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
