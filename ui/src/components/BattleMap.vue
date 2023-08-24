<template>
    <b-container class="battle-map" fluid>
        <b-row>
            <b-col cols="auto"
                ><button @click="addMarker">Create Marker</button></b-col
            >

            <b-col>
                <svg
                    class="battle-map-svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 1000 1000"
                    ref="map"
                    @mousemove="onMousemove"
                >
                    <EntityMarker
                        v-for="(marker, index) in markers"
                        :key="`${marker.name}-${index}`"
                        :marker="marker"
                        :screenCTM="screenCTM"
                        :mouseLocation="currentLocation"
                    />
                </svg>
            </b-col>
        </b-row>
    </b-container>
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
            currentLocation: {
                x: 0,
                y: 0,
            },
        };
    },
    methods: {
        addMarker(): void {
            const test = new Marker('test', 'red', 50, 50, 20);
            this.map.addMarker(test);
        },
        onMousemove(event: MouseEvent) {
            this.currentLocation = {
                x: event.clientX,
                y: event.clientY,
            };
        },
    },
    computed: {
        markers(): Marker[] {
            return this.map.getMarkers();
        },
        screenCTM(): SVGMatrix | null {
            const map = this.$refs.map as SVGGraphicsElement;
            return map.getScreenCTM();
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
    background-color: lightgrey;
    height: 100%;
    width: 100%;
}
</style>
