<template>
    <div>
      <div class="card-columns">
        <div v-for="(beer, index) in beers" :item="beer" :key="index" class="card">
          <div class="beer">
            <div :class="(beer.styleshort) + ' beer-content'">
              <div class="row">
                <div class="col-12">
                  <div class="line-bottom padding">
                    <h3 class="title">{{ beer.name }}</h3>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="line-bottom">
                    <div class="row">
                      <div class="col-5 col-sm-4 no-padding-right">
                        <div class="padding right">
                          <h2 class="beer-alc">
                            {{ beer.abv }}<span class="alc">%</span>
                          </h2>
                        </div>
                      </div>
                      <div class="col-7 col-sm-8 no-padding-left">
                        <div class="padding extra">
                          <h4>{{beer.breweryName}}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="line-bottom padding">
                    <div class="beer-style">
                      <span>{{beer.style}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 bottom-section">
                  <div class="row">
                    <div class="col-12 col-sm-6 no-padding-right">
                      <div class="padding right">
                        <span class="beer-location">{{ beer.room }}</span>
                      </div>
                    </div>
                    <div class="col-12 col-sm-6 no-padding-left text-right">
                      <div class="padding">
                        <span class="beer-tapsession">
                          <span v-if="beer.untappdSectionId === '440439'">Friday early</span>
                          <span v-else-if="beer.untappdSectionId === '440440'">Friday late</span>
                          <span v-else-if="beer.untappdSectionId === '440449'">Saturday early</span>
                          <span v-else-if="beer.untappdSectionId === '440450'">Saturday late</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
<script>
export default {
  name: "BeerList",
  props: {},
  computed: {
    beers() {
      return this.$store.getters.GetBeersForList;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
