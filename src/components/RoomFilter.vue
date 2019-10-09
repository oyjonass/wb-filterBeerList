<template>
    <div>
        <div class="buttons-tapsession buttons-room">
            <div class="left label">Room</div>
                <button v-for="(room, index3) in getRooms"
                        :item="room"
                        :key="index3"
                        class="wb-btn filter"
                        :class="[{'active': isActiveRoom(room.name)}]"
                        @click="roomFilter(room.name)">
                <span></span>
                <span>{{room.name}} ({{room.count}})</span>
            </button>
        </div>
    </div>  
</template>

<script>
var _ = require('lodash');

export default {
    name: 'RoomFilter',
    props: {
    },
    data() {
        return {
            selectedRooms: [],
        }
    },
    computed: {
        getRooms() {
            const beers = this.beers;
            let roomData = _.chain(beers)
                    .filter('room')
                    .sortBy('room')
                    .map('room')
                    .countBy()
                    .value();
            let array = [];
            let index = 0;
            _.forEach(roomData, function (value, key) {
                const roomName = key;
                const count = _.filter(beers, function (beer) {
                    if (beer.room == null) {
                        return 0;
                    }
                    return beer.room.indexOf(roomName) > -1;
                }).length

                index++;

                const obj = {
                    id: index,
                    name: roomName,
                    disabled: count > 0 ? false : true,
                    count: count,
                };
                array.push(obj);
            });
            return array;
        },
        beers() {
            return this.$store.getters.GetBeersForRoom;
        },
        storeSearchRoom() {
            return this.$store.state.searchRoom;
        },

    },
    watch: {
        storeSearchRoom: function () {
            this.selectedRooms = this.storeSearchRoom;
        },
        $route(to) {
            // check if we have something in querysting
            const currentQueryString = this.getQueryStringFilter(to);
            // We compare the arrays if not equal we update model array
            if (!_.isEqual(_.sortBy(this.selectedRooms), _.sortBy(currentQueryString))) {
                this.selectedRooms = currentQueryString;
            }
        },
        selectedRooms: function () {
            this.$store.commit('setSearchRoom', this.selectedRooms);
        }
    },
    created() {
        // Fetch querystring value on startup
        const currentQS = this.getQueryStringFilter(this.$route);
        // We compare the arrays if not equal we update model array
        if (!_.isEqual(_.sortBy(this.selectedRooms), _.sortBy(currentQS))) {
            this.selectedRooms = currentQS;
        }
    },
    methods: {
        roomFilter(room) {
            let selectedRooms = this.selectedRooms;

            const containsItem = _.includes(selectedRooms, room);
            if (containsItem) {
                // Remove the item
                selectedRooms.splice(selectedRooms.indexOf(room), 1 );
            } else {
                // Add the item
                selectedRooms.push(room);
            }
            // update store
            this.$store.commit('setSearchRoom', selectedRooms);

            const currentQueryString = this.getQueryStringFilter(this.$route);

            if (!_.isEqual(_.sortBy(this.selectedRooms), _.sortBy(currentQueryString))) {
                // We need to update querystring

                // Read current querystring (all of it), we are about to modify it
                const query = Object.assign({}, this.$route.query);
                // We delete querystring values used by this component if any (all languages)
                delete query.room;

                if (this.selectedRooms.length < 1 || this.selectedRooms == undefined) {
                    this.$router.replace({ query });
                } else {
                    const checkedAsString = this.selectedRooms.toString();
                    const encodedInput = encodeURI(checkedAsString);
                    let textQs = { room: encodedInput };
                    const queryWithNewSearch = Object.assign(textQs, query);
                    this.$router.replace({ query: queryWithNewSearch });
                }
            }
        },
        isActiveRoom(room) {
            return _.includes(this.selectedRooms, room);
        },
        getQueryStringFilter(qs) {
            // Check if we have kategori or category in querystring
            if (qs.query.room) {
                return decodeURI(qs.query.room).split(',');
            }
            return [];
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
