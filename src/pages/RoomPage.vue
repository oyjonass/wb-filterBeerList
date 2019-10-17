<template>
  <div class="Room" :class="{ 'olhall12': room === 1, 'ollhall34': room === 2, 'maskinhallen': room === 3, 'scene1': room === 4, 'scene2': room === 5, 'loftet': room === 6  }">
    
    <div class="body-inner">
      <div class="header">
        <div class="container">
          <div class="row">
						<div class="col-6">
							<h1>ON TAP NOW</h1>
						</div>
						<div class="col-6 text-right">
							<h1 v-if="room == 1">ØLHALLEN 1 + ØLHALLEN 2</h1>
							<h1 v-if="room == 2">ØLHALLEN 3 + ØLHALLEN 4</h1>
							<h1 v-if="room == 3">Maskinhallen</h1>
							<h1 v-if="room == 4">Scene 1</h1>
							<h1 v-if="room == 5">Scene 2</h1>
							<h1 v-if="room == 6">Lofet</h1>
						</div>
					</div>
				</div>
			</div>
			<div class="container main-container">
        <div v-for="(beer, index) in beers" :item="beer" :key="index">
          
          <div class="line">
            <div class="row first">
              <div class="col-sm-12 tableHeader">
                <div class="airportList" v-for="(beerNameChar, index2) in getArrayForOutput(beer.name, nameLength)" :item="beerNameChar" :key="index2">
                    {{beerNameChar}}&nbsp;
                </div>
              </div>
            </div>
            <div class="row second">
              <div class="col-sm-12">
                <div class="screen-col first tableHeader">
                  <div class="airportList" v-for="(breweryChar, index3) in getArrayForOutput(beer.breweryName, breweryLength)" :item="breweryChar" :key="index3">
                      {{breweryChar}}&nbsp;
                  </div>
                </div>
                <div class="screen-col second tableHeader">
                  <div class="airportList" v-for="(styleChar, index4) in getArrayForOutput(beer.style, styleLength)" :item="styleChar" :key="index4">
                      {{styleChar}}&nbsp;
                  </div>
                </div>
                <div class="screen-col third tableHeader">
                  <div class="airportList" v-for="(abvChar, index5) in getArrayForABVOutput(beer.abv, 4)" :item="abvChar" :key="index5">
                      {{abvChar}}&nbsp;
                  </div>
                </div>
                <div class="screen-col fourth status tableHeader">
                    <div class="airportList one" v-for="(statusChar, index8) in getArrayForStatusOutput(beer.beerStatus, 6)" :item="statusChar" :key="index8">
                        {{statusChar}}&nbsp;
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
/* eslint-disable */
var _ = require("lodash");

export default {
  name: "Room",
  props: {
    /*
      Room legal values
      =========================
      1 = Ølhall 1 og 2
      2 = Ølhall 3 og 4
      3 = Maskinhallen
      4 = Scene 1
      5 = Scene 2
      6 = Loftet
    */
    room: Number,
  },
  data: function () {
    return {
      nameLength: 20,
      breweryLength: 11,
      styleLength: 21,
      selectedRooms: [],
    }
  },  
  computed: {
    beers() {
      return this.$store.getters.GetBeersMonitor;
    },
    storeSearchRoom() {
      return this.$store.state.searchRoom;
    },
    storeSearchTime() {
      return this.$store.state.searchTime;
    }
  },
  watch: {
    storeSearchRoom: function() {
      this.selectedRooms = this.storeSearchRoom;
    },
    selectedRooms: function() {
      this.$store.commit("setSearchRoom", this.selectedRooms);
    }
  },
  mounted() {
      if(this.room === 1) {
        // 1 = Ølhall 1 og 2
        this.nameLength = 23;
        this.breweryLength = 11;
        this.styleLength = 10;
        this.selectedRooms = ['Ølhallen 1','Ølhallen 2'];
      } else if(this.room === 2) {
        // 2 = Ølhall 3 og 4
        this.nameLength = 23;
        this.breweryLength = 11;
        this.styleLength = 10;
        this.selectedRooms = ['Ølhallen 3','Ølhallen 4'];

      }  else if(this.room === 3) {
        // 3 = Maskinhallen
        this.nameLength = 21;
        this.selectedRooms = ['Maskinhallen'];
        this.breweryLength = 11;
        this.styleLength = 10;

      }  else if(this.room === 4) {
        // 4 = Scene 1
        this.nameLength = 23;
        this.breweryLengt = 11;
        this.styleLength = 10;
        this.selectedRooms = ['Scene 1'];
      }  else if(this.room === 5) {
        // 4 = Scene 2
        this.nameLength = 23;
        this.breweryLength = 11;
        this.styleLength = 10;
        this.selectedRooms = ['Scene 2'];
      }  else if(this.room === 6) {
        // Loftet
        this.nameLength = 23;
        this.breweryLength = 11;
        this.styleLength = 10;
        this.selectedRooms = ['Loftet'];
      }
      this.loadData();
      this.startInterval();
  },
  methods: {
    loadData() {
      // check tap session it is
      var currentSearchTime = this.getCurrentTapSession();
      if (!_.isEqual(_.sortBy(currentSearchTime), _.sortBy(this.storeSearchTime))) {
        console.log('new tap session');
        this.$store.commit("setSearchTime", currentSearchTime);
     }
      console.log('loading data from json');
      this.$store.dispatch('fetchBeers');
    },
    startInterval: function () {
          const self = this;
          setInterval(function() {
            self.loadData();
          }, 30000);
    },
    getArrayForOutput(text, maxlenth) {
        let filledArray = new Array(maxlenth);
        var beerLength = text.length > maxlenth 
              ? maxlenth
              : text.length;
        for(let i=0; i < beerLength; i++){
            filledArray[i] = text.charAt(i).toUpperCase();
        }
        return filledArray;
    },
    getArrayForABVOutput(text, maxlenth) {
        let filledArray = new Array(maxlenth);
        for(let i=0; i < text.length; i++){
            filledArray[i] = text.charAt(i).toUpperCase();
        }
        if(text.length === 3) {
          //filledArray.push('');
        }
        return filledArray;
    },
    getArrayForStatusOutput(text, maxlenth) {
        if(text.length === 0) {
          text = 'ON TAP';
        }
        let filledArray = new Array(maxlenth);
        var beerLength = text.length > maxlenth 
              ? maxlenth
              : text.length;
        for(let i=0; i < beerLength; i++){
            filledArray[i] = text.charAt(i).toUpperCase();
        }
        return filledArray;
    },
    getCurrentTapSession() {
      // eslint-disable-next-line
      var dateNow = new Date();
      const day = dateNow.getDate();
      const hour = dateNow.getHours()
      var searchTimeId = ['440439'];  // Friday 14-18
      if(day === 18 && hour >= 18) {
        searchTimeId = ['440440'];  // Friday 18 - 22
      } else if(day === 19 && hour < 18) {
        searchTimeId = ['440449']; // Saturday 14-18
      } else if(day === 19 && hour >= 18) {
        searchTimeId = ['440450']; // Saturday 18-22
      }
      return searchTimeId;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
