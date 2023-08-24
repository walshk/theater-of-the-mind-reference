<template>
    <b-container class="battle-map" fluid>
        <b-row class="fullHeight">
            <b-col cols="auto" class="fullHeight">
                <MarkerBuilder @createMarker="addMarker" />
            </b-col>

            <b-col class="fullHeight" style="padding-right: 0">
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
import MarkerBuilder from './MarkerBuilder.vue';

export default Vue.extend({
    name: 'BattleMap',
    components: {
        EntityMarker,
        MarkerBuilder,
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
        addMarker(markerForm: {
            name: string;
            color: string;
            fontColor: string;
            size: string;
        }): void {
            const { name, color, fontColor, size } = markerForm;

            this.map.addMarker(
                new Marker(name, color, fontColor, 500, 500, +size)
            );
        },
        onMousemove(event: MouseEvent) {
            event.preventDefault();
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
