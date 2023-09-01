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
                    @mouseup="putDownMarker"
                >
                    <EntityMarker
                        v-for="(marker, index) in markers"
                        :key="`${marker.name}-${index}`"
                        :marker="marker"
                        :dragging="isDragging"
                        @editMarker="editMarker"
                        @pickUp="pickUpMarker"
                    />
                </svg>
            </b-col>
            <b-col lg="3" class="fullHeight d-none d-lg-block">
                <MarkerBuilder
                    :marker="editingMarker"
                    @createMarker="addMarker"
                    @updateMarker="updateMarker"
                    @cancelEdit="cancelEditMarker"
                    @removeMarker="removeMarker"
                />
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

        socket.on('updateMarkerTraits', (markerString: string) => {
            const updatedMarker = JSON.parse(markerString);
            const markerToUpdate = this.map.markers.find(
                (m) => m.id === updatedMarker.id
            );

            if (markerToUpdate) {
                markerToUpdate.setName(updatedMarker.name);
                markerToUpdate.setColor(updatedMarker.color);
                markerToUpdate.setFontColor(updatedMarker.fontColor);
                markerToUpdate.setRadius(updatedMarker.radius);
            }
        });
    },
    data() {
        return {
            map: new BattleMap(),
            selectedMarker: undefined as Marker | undefined,
            editingMarker: undefined as Marker | undefined,
            isDragging: false,
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

            if (this.selectedMarker && this.isDragging && this.screenCTM) {
                const newX =
                    (event.clientX - this.screenCTM.e) / this.screenCTM.a;
                const newY =
                    (event.clientY - this.screenCTM.f) / this.screenCTM.d;

                this.selectedMarker.moveMarkerTo(newX, newY);
            }

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
            this.editingMarker = undefined;
            socket.emit('removeMarker', markerId);
        },
        pickUpMarker(marker: Marker): void {
            this.selectedMarker = marker;
            this.isDragging = true;
        },
        putDownMarker(): void {
            if (this.selectedMarker && this.isDragging) {
                this.isDragging = false;

                const movement = {
                    id: this.selectedMarker.id,
                    x: this.selectedMarker.x,
                    y: this.selectedMarker.y,
                };

                socket.emit('moveMarker', JSON.stringify(movement));
            }
        },
        editMarker(marker: Marker): void {
            this.editingMarker = marker;
        },
        updateMarker(): void {
            if (!this.editingMarker) {
                return;
            }

            const markerString = JSON.stringify(this.editingMarker);
            this.editingMarker = undefined;
            socket.emit('updateMarkerTraits', markerString);
        },
        cancelEditMarker(): void {
            this.editingMarker = undefined;
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
