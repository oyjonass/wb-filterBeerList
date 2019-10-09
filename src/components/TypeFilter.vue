<template>
  <div>
    <div class="buttons-style">
      <div class="left label">Type</div>
      <span v-for="(beertype, index) in getBeerTypes" :item="beertype" :key="index">
        <button
          class="wb-btn filter"
          :class="[{'active': isActiveBeerType(beertype.name)}, beertype.cssClassName]"
          @click="beerTypeFilter(beertype.name)"
        >
          <span></span>
          <span>{{ beertype.name }} ({{beertype.count}})</span>
        </button>
      </span>
    </div>
  </div>
</template>

<script>
var _ = require("lodash");

export default {
  name: "TypeFilter",
  props: {},
  data() {
    return {
      selectedBeerType: []
    };
  },
  computed: {
    storeSearchBeerType() {
      return this.$store.state.searchBeerType;
    },
    beers() {
      return this.$store.getters.GetBeersForType;
    },
    getBeerTypes() {
      const items = this.beers;
      let typeBeerData = _(items)
        .flatMap(f => f.filterStyle)
        .uniqBy(f => f)
        .sortBy(f => f)
        .value();

      var array = [];
      var that = this;
      _.forEach(typeBeerData, function(beertype) {
        if (beertype == null) {
          return;
        }
        const beersWithType = _.filter(items, beer =>
          _.includes(_.flatMap(beer.filterStyle), beertype)
        );
        const count = beersWithType.length;
        const cssClassName = that.getCssClassName(beertype);
        const sortvalue = that.getSortValue(beertype);

        var obj = {
          name: beertype,
          disabled: count > 0 ? false : true,
          cssClassName: cssClassName,
          count: count,
          sort: sortvalue
        };
        array.push(obj);
      });
      array = _.sortBy(array, "sort");
      return array;
    }
  },
  watch: {
    storeSearchBeerType: function() {
      this.selectedBeerType = this.storeSearchBeerType;
    },
    $route(to) {
      // check if we have something in querysting
      const currentQueryString = this.getQueryStringFilter(to);
      // We compare the arrays if not equal we update model array
      if (
        !_.isEqual(
          _.sortBy(this.selectedBeerType),
          _.sortBy(currentQueryString)
        )
      ) {
        this.selectedBeerType = currentQueryString;
      }
    },
    selectedBeerType: function() {
      this.$store.commit("setSearchBeerType", this.selectedBeerType);
    }
  },
  created() {
    // Fetch querystring value on startup
    const currentQS = this.getQueryStringFilter(this.$route);
    // We compare the arrays if not equal we update model array
    if (!_.isEqual(_.sortBy(this.selectedBeerType), _.sortBy(currentQS))) {
      this.selectedBeerType = currentQS;
    }
  },
  methods: {
    getCssClassName(beerstyle) {
      var style = beerstyle.toLowerCase();
      if (style === "pale ale") {
        style = "pale-ale";
      }
      return style;
    },
    getSortValue(beerstyle) {
      var style = beerstyle.toLowerCase();
      switch (style) {
        case "lager":
          return "1";
        case "ipa":
          return "2";
        case "pale ale":
          return "3";
        case "farmhouse":
          return "4";
        case "sour":
          return "5";
        case "stout":
          return "6";
        case "porter":
          return "7";
        default:
          // other
          return "9999";
      }
    },
    beerTypeFilter(beertype) {
      let selectedBeerType = this.selectedBeerType;
      const containsItem = _.includes(selectedBeerType, beertype);
      if (containsItem) {
        // Remove the item
        selectedBeerType.splice(selectedBeerType.indexOf(beertype), 1);
      } else {
        // Add the item
        selectedBeerType.push(beertype);
      }
      // update store
      this.$store.commit("setSearchBeerType", selectedBeerType);

      const currentQueryString = this.getQueryStringFilter(this.$route);

      if (
        !_.isEqual(
          _.sortBy(this.selectedBeerType),
          _.sortBy(currentQueryString)
        )
      ) {
        // We need to update querystring

        // Read current querystring (all of it), we are about to modify it
        const query = Object.assign({}, this.$route.query);
        // We delete querystring values used by this component if any (all languages)
        delete query.style;

        if (
          this.selectedBeerType.length < 1 ||
          this.selectedBeerType == undefined
        ) {
          this.$router.replace({ query });
        } else {
          const checkedAsString = this.selectedBeerType.toString();
          const encodedInput = encodeURI(checkedAsString);
          let textQs = { style: encodedInput };
          const queryWithNewSearch = Object.assign(textQs, query);
          this.$router.replace({ query: queryWithNewSearch });
        }
      }
    },
    isActiveBeerType(beertype) {
      return _.includes(this.selectedBeerType, beertype);
    },
    getQueryStringFilter(qs) {
      // Check if we have kategori or category in querystring
      if (qs.query.style) {
        return decodeURI(qs.query.style).split(",");
      }
      return [];
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
