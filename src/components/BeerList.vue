<template>
<div>
    <div class="card-columns">
        <div v-for="(beer, index) in beers" :item="beer" :key="index" class="card">
            <div class="beer">
                <div class="row">
                    <div class="col-2">
                        <div :class="(beer.styleshort) + ' left-bar'">  
                    </div>
                    </div>
                    <div class="col-10">
                        <div :class="(beer.styleshort) + ' beer-content'">
                            <h4>{{beer.breweryName}}</h4>
                            <h3 class="title">{{ beer.name }}</h3>
                            <h2 class="beer-alc">{{ beer.abv }}%</h2>
                            <div class="beer-style">
                                <span>{{ beer.style }}</span>
                            </div>
                            <div>
                                <img src="../assets/time.svg" />
                                <span class="beer-tapsession">
                                    <span v-if="beer.untappdSectionId === '440439'">Fri 14-18</span>
                                    <span v-else-if="beer.untappdSectionId === '440440'">Fri 18-22</span>
                                    <span v-else-if="beer.untappdSectionId === '440449'">Sat 14-18</span>
                                    <span v-else-if="beer.untappdSectionId === '440450'">Sat 18-22</span>
                                </span>
                            </div>
                            <div>
                                <img  src="../assets/location.svg" />
                                <span class="beer-location">{{ beer.room }}</span>
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
    name: 'BeerList',
    props: {
    },
    computed: {
        beers() {
            return this.$store.getters.GetBeersForList;
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
