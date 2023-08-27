<template>
    <b-container class="battle-map" fluid>
        <b-row class="fullHeight">
            <b-col
                class="fullHeight"
                style="padding-left: 0; padding-right: 1px"
            >
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
                        @markerMoved="markerMoved"
                        @removeMarker="removeMarker"
                    />
                </svg>
            </b-col>
            <b-col lg="3" class="fullHeight d-none d-lg-block">
                <MarkerBuilder @createMarker="addMarker" />
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import Vue from 'vue';

import BattleMap from '@/models/BattleMap';
import Marker from '@/models/Marker';
import MarkerMovement from '@/models/MarkerMovement';

import EntityMarker from '@/components/EntityMarker.vue';
import MarkerBuilder from './MarkerBuilder.vue';

import socket from '@/socket';

export default Vue.extend({
    name: 'BattleMap',
    components: {
        EntityMarker,
        MarkerBuilder,
    },
    mounted() {
        this.map = new BattleMap();

        socket.on('markerError', (message: string) => {
            this.$bvToast.toast(message, {
                title: 'Marker Error',
                variant: 'warning',
            });
        });

        socket.on('addMarker', (markerString: string) => {
            console.log('received marker', JSON.parse(markerString));

            const mData = JSON.parse(markerString);
            const marker = new Marker(
                mData.name,
                mData.color,
                mData.fontColor,
                mData.x,
                mData.y,
                mData.radius,
                mData.id
            );
            this.map.addMarker(marker);
        });

        socket.on('markerMoved', (markerMovementString: string) => {
            const movement: MarkerMovement = JSON.parse(markerMovementString);
            const movedMarker = this.map.markers.find(
                (m) => m.id === movement.id
            );

            if (movedMarker) {
                movedMarker.moveMarkerToSmooth(movement.x, movement.y);
            }
        });

        socket.on('removeMarker', (markerId: string) => {
            this.map.removeMarker(markerId);
        });
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

            const marker = new Marker(name, color, fontColor, 500, 500, +size);
            this.map.addMarker(marker);

            socket.emit('addMarker', marker.toString());
        },
        onMousemove(event: MouseEvent): void {
            event.preventDefault();
            this.currentLocation = {
                x: event.clientX,
                y: event.clientY,
            };
        },
        markerMoved(markerMovement: MarkerMovement): void {
            socket.emit('moveMarker', JSON.stringify(markerMovement));
        },
        removeMarker(markerId: string): void {
            this.map.removeMarker(markerId);
            socket.emit('removeMarker', markerId);
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
