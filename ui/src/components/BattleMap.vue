<template>
    <div class="battle-map">
        <div style="height: auto">
            <button @click="addMarker">Create Marker</button>
        </div>
        <div style="height: 80%">
            <svg class="battle-map-svg" viewBox="0 0 100 100">
                <EntityMarker
                    v-for="(marker, index) in markers"
                    :key="`${marker.name}-${index}`"
                    :marker="marker"
                />
            </svg>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import BattleMap from '@/models/BattleMap';
import Marker from '@/models/Marker';

import EntityMarker from '@/components/EntityMarker.vue';

export default Vue.extend({
    name: 'BattleMap',
    components: {
        EntityMarker,
    },
    mounted() {
        this.map = new BattleMap();
    },
    data() {
        return {
            map: new BattleMap(),
        };
    },
    methods: {
        addMarker(): void {
            const test = new Marker('test', 'red', 50, 50, 5);
            console.log(test);
            console.log(this.markers);
            this.map.addMarker(test);
            console.log(this.markers);
        },
    },
    computed: {
        markers(): Marker[] {
            return this.map.getMarkers();
        },
    },
});
</script>

<style scoped>
.battle-map {
    height: 100%;
    width: 100%;
    display: block;
}

.battle-map-svg {
    height: 50%;
    width: 100%;
}
</style>
