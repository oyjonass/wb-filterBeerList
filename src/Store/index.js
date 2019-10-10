import Vue from 'vue';
import Vuex from 'vuex';
require('es6-promise').polyfill();
import axios from 'axios';
Vue.use(Vuex);
var _ = require('lodash');


function filterStyle(state, beers) {
    var searchBeerType = state.searchBeerType;
    if (searchBeerType.length > 0) {
        beers = _.filter(beers, (beer) => _.intersection(searchBeerType, _.flatMap(beer.filterStyle)).length > 0);

    }
    return beers;
}

function filterTime(state, beers) {
    var searchTime = state.searchTime;
    if (searchTime.length > 0) {
        beers = _.filter(beers, (v) => _.includes(searchTime, v.untappdSectionId));
    }
    return beers;
}

function filterRoom(state, beers) {
    var searchRoom = state.searchRoom;
    if (searchRoom.length > 0) {
        beers = _.filter(beers, (v) => _.includes(searchRoom, v.room));
    }
    return beers;
}

function filterBrewery(state, beers) {
    var searchBrewery = state.searchBrewery;
    if (searchBrewery.length > 0) {
        beers = _.filter(beers, (v) => _.includes(searchBrewery, v.breweryName));
    }
    return beers;
}

export default new Vuex.Store({
    state: { // = data
        isLoading: true,
        error: false,
        errorText: "",
        beers: [],
        searchBeerType: [],
        searchTime: [],
        searchRoom: [],
        searchBrewery: [],
    },
    mutations: {
        setIsloading(state, isloading) {
            state.isLoading = isloading;
        },
        setBeers(state, beers) {
            state.beers = beers;
        },
        setError(state, error) {
            state.error = error;
        },
        setErrorText(state, errorText) {
            state.errorText = errorText;
        },
        setSearchBeerType(state, searchBeerType) {
            state.searchBeerType = searchBeerType;
        },
        setSearchTime(state, searchTime) {
            state.searchTime = searchTime;
        },
        setSearchRoom(state, searchRoom) {
            state.searchRoom = searchRoom;
        },
        setSearchBrewery(state, searchBrewery) {
            state.searchBrewery = searchBrewery;
        },

    },
    actions: { // = methods
        fetchBeers(context) {
            // make the call
            var url = '/wp-content/themes/wb2019/untappd/http/beers.json';
            axios
                .get(url)
                .then((response) => {
                    const beers = _.each(response.data, function (beer) {
                        beer.styleshort = beer.style.substring(0, 3).toLowerCase();
                        let time = ''; 
                        switch(beer.untappdSectionId) {
                            case '440439':
                              time = 'fredag1';
                              break;
                            case '440440':
                              time = 'fredag2';
                              break;
                            case '440449':
                                time = 'lordag1';
                                break;
                            case '440450':
                                time = 'lordag2';
                                break;
        
                              //'440449'
                            default:
                              // code block
                          }
                          beer.time = time;
                    });
                    context.commit('setBeers', beers);
                    // We are done. This will show the UI
                    context.commit('setIsloading', false);
                })
                .catch(error => {
                    context.commit('setErrorText', error);
                    context.commit('setError', true);
                });
        },
    },
    getters: { // = computed properties
        GetBeersForRoom(state) {
            let beers = state.beers;
            beers = filterTime(state, beers);
            beers = filterStyle(state, beers);
            beers = filterBrewery(state, beers);

            return beers;
        },
        GetBeersForTime(state) {
            let beers = state.beers;
            beers = filterRoom(state, beers);
            beers = filterStyle(state, beers);
            beers = filterBrewery(state, beers);

            return beers;
        },
        GetBeersForType(state) {
            let beers = state.beers;
            beers = filterRoom(state, beers);
            beers = filterTime(state, beers);
            beers = filterBrewery(state, beers);

            return beers;
        },
        GetBeersForBrewery(state) {
            let beers = state.beers;
            beers = filterRoom(state, beers);
            beers = filterTime(state, beers);
            beers = filterStyle(state, beers);
            return beers;
        },

        GetBeersForList(state) {
            let beers = state.beers;

            beers = filterStyle(state, beers);

            beers = filterTime(state, beers);

            beers = filterRoom(state, beers);

            beers = filterBrewery(state, beers);

            // Sorting
            beers = _.sortBy(beers, 'name');

            return beers;
        },
    }
});