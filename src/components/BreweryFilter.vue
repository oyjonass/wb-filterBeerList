<template>
  <div>
    <!-- <div class="buttons-brewery" v-if="breweryCount > 1000">
      <div class="left label">Brew</div>
      <button
        v-for="(brewery, index3) in getBrewerys"
        :item="brewery"
        :key="index3"
        class="wb-btn filter brewery"
        :class="[{'active': isActiveBrewery(brewery.name)}]"
        @click="breweryFilter(brewery.name)"
      >
        <span></span>
        <span>{{brewery.name}} ({{brewery.count}})</span>
      </button>
    </div> -->

    <div class="buttons-brewery">
      <div class="left label">Brew</div>

      <div class="form-group">
        <label for="exampleFormControlSelect2" class="sr-only">Example multiple select</label>
        <select v-model="selectedBrewery" multiple class="form-control" id="exampleFormControlSelect2">
          <option v-for="(brewery, index4) in getBrewerys" v-bind:value="brewery.name" :key="index4">
            {{ brewery.name }}
          </option>
        </select>

      </div>

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
      selectedBrewery: [],
      breweryCount: 0
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
      this.breweryCount = index;
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
      // We compare the arrays if not equal we update model array
      if (
        !_.isEqual(_.sortBy(this.selectedBrewery), _.sortBy(currentQueryString))
      ) {
        this.selectedBrewery = currentQueryString;
      }
    },
    selectedBrewery: function() {
      this.$store.commit("setSearchBrewery", this.selectedBrewery);

      const currentQueryString = this.getQueryStringFilter(this.$route);
      if (
        !_.isEqual(_.sortBy(this.selectedBrewery), _.sortBy(currentQueryString))
      ) {
        // We need to update querystring

        // Read current querystring (all of it), we are about to modify it
        const query = Object.assign({}, this.$route.query);
        // We delete querystring values used by this component if any (all languages)
        delete query.brewery;

        if (this.selectedBrewery.length < 1 || this.selectedBrewery == undefined) {
          this.$router.replace({ query });
        } else {
          const checkedAsString = this.selectedBrewery.toString();
          const encodedInput = encodeURI(checkedAsString);
          let textQs = { brewery: encodedInput };
          const queryWithNewSearch = Object.assign(textQs, query);
          this.$router.replace({ query: queryWithNewSearch });
        }
      }
    }
  },
  created() {
    // Fetch querystring value on startup
    const currentQS = this.getQueryStringFilter(this.$route);
    // We compare the arrays if not equal we update model array
    if (!_.isEqual(_.sortBy(this.selectedBrewery), _.sortBy(currentQS))) {
      this.selectedBrewery = currentQS;
    }
  },
  methods: {
    // breweryFilter(brewery) {
    //   let selectedBrewery = this.selectedBrewery;

    //   const containsItem = _.includes(selectedBrewery, brewery);
    //   if (containsItem) {
    //     // Remove the item
    //     selectedBrewery.splice(selectedBrewery.indexOf(brewery), 1);
    //   } else {
    //     // Add the item
    //     selectedBrewery.push(brewery);
    //   }
    //   // update store
    //   this.$store.commit("setSearchBrewery", selectedBrewery);

    //   const currentQueryString = this.getQueryStringFilter(this.$route);

    //   if (
    //     !_.isEqual(_.sortBy(this.selectedBrewery), _.sortBy(currentQueryString))
    //   ) {
    //     // We need to update querystring

    //     // Read current querystring (all of it), we are about to modify it
    //     const query = Object.assign({}, this.$route.query);
    //     // We delete querystring values used by this component if any (all languages)
    //     delete query.brewery;

    //     if (this.selectedBrewery.length < 1 || this.selectedBrewery == undefined) {
    //       this.$router.replace({ query });
    //     } else {
    //       const checkedAsString = this.selectedBrewery.toString();
    //       const encodedInput = encodeURI(checkedAsString);
    //       let textQs = { brewery: encodedInput };
    //       const queryWithNewSearch = Object.assign(textQs, query);
    //       this.$router.replace({ query: queryWithNewSearch });
    //     }
    //   }
    // },
    // isActiveBrewery(brewery) {
    //   return _.includes(this.selectedBrewery, brewery);
    // },
    getQueryStringFilter(qs) {
      // Check if we have kategori or category in querystring
      if (qs.query.brewery) {
        return decodeURI(qs.query.brewery).split(",");
      }
      return [];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
