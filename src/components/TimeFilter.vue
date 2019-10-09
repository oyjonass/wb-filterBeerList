<template>
    <div>
        <div class="buttons-tapsession">
            <div class="left label">Time</div>
                <button v-for="(time, index3) in getTimes"
                        :item="time"
                        :key="index3"
                        class="wb-btn filter"
                        :class="[{'active': isActiveTime(time.id)}, time.id]"
                        @click="timeFilter(time.id)">
                <span></span>
                <span>{{time.name}}</span>
            </button>
        </div>

    </div>  
</template>

<script>
var _ = require('lodash');

export default {
    name: 'TimeFilter',
    props: {
    },
    data() {
        return {
            selectedSearchTime: [],
        }
    },
    computed: {
        getTimes() {
            const beers = this.beers;
            let timeData = _.chain(beers)
                    .filter('untappdSectionId')
                    .sortBy('untappdSectionId')
                    .map('untappdSectionId')
                    .countBy()
                    .value();
            let array = [];
            let index = 0;
            var that = this;
            _.forEach(timeData, function (value, key) {
                const sectionId = key;
                const count = _.filter(beers, function (beer) {
                    return beer.untappdSectionId.indexOf(sectionId) > -1;
                }).length

                index++;
                var text = that.getSectionName(index, count);

                const obj = {
                    id: sectionId,
                    name: text,
                    disabled: count > 0 ? false : true,
                    count: count,
                };
                array.push(obj);
            });
            return array;
        },
        beers() {
            return this.$store.getters.GetBeersForTime;
        },
        storeSearchTime() {
            return this.$store.state.searchTime;
        },

    },
    watch: {
        storeSearchTime: function () {
            this.selectedSearchTime = this.storeSearchTime;
        },
        $route(to) {
            // check if we have something in querysting
            const currentQueryString = this.getQueryStringFilter(to);
            // We compare the arrays if not equal we update model array
            if (!_.isEqual(_.sortBy(this.selectedSearchTime), _.sortBy(currentQueryString))) {
                this.selectedSearchTime = currentQueryString;
            }
        },
        selectedSearchTime: function () {
            this.$store.commit('setSearchTime', this.selectedSearchTime);
        }

    },
    created() {
        // Fetch querystring value on startup
        const currentQS = this.getQueryStringFilter(this.$route);
        // We compare the arrays if not equal we update model array
        if (!_.isEqual(_.sortBy(this.selectedSearchTime), _.sortBy(currentQS))) {
            this.selectedSearchTime = currentQS;
        }
    },
    methods: {
        getSectionName(index, count) {
            switch (index) {
                case 1:
                    return 'Fri 14-18 (' + count + ')';
                case 2:
                    return 'Fri 18-22 (' + count + ')';
                case 3:
                    return 'Sat 14-18 (' + count + ')';
                case 4:
                    return 'Sat 18-22 (' + count + ')';
            }
        },
        timeFilter(time) {
            let selectedSearchTime = this.selectedSearchTime;
            const containsItem = _.includes(selectedSearchTime, time);
            if (containsItem) {
                // Remove the item
                selectedSearchTime.splice(selectedSearchTime.indexOf(time), 1 );
            } else {
                // Add the item
                selectedSearchTime.push(time);
            }
            // update store
            this.$store.commit('setSearchTime', selectedSearchTime);

            const currentQueryString = this.getQueryStringFilter(this.$route);

            if (!_.isEqual(_.sortBy(this.selectedSearchTime), _.sortBy(currentQueryString))) {
                // We need to update querystring

                // Read current querystring (all of it), we are about to modify it
                const query = Object.assign({}, this.$route.query);
                // We delete querystring values used by this component if any (all languages)
                delete query.time;

                if (this.selectedSearchTime.length < 1 || this.selectedSearchTime == undefined) {
                    this.$router.replace({ query });
                } else {
                    const checkedAsString = this.selectedSearchTime.toString();
                    const encodedInput = encodeURI(checkedAsString);
                    let textQs = { time: encodedInput };
                    const queryWithNewSearch = Object.assign(textQs, query);
                    this.$router.replace({ query: queryWithNewSearch });
                }
            }
        },
        isActiveTime(time) {
            return _.includes(this.selectedSearchTime, time);
        },
        getQueryStringFilter(qs) {
            // Check if we have kategori or category in querystring
            if (qs.query.time) {
                return decodeURI(qs.query.time).split(',');
            }
            return [];
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
