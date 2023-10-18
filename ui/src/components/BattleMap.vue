<template>
    <b-container class="battle-map" fluid>
        <b-row class="fullHeight">
            <b-col
                class="fullHeight"
                style="padding-left: 0; padding-right: 1px"
                id="battleMapCol"
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
                    <defs>
                        <pattern
                            id="grid"
                            width="80"
                            height="80"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 80 0 L 0 0 0 80"
                                fill="none"
                                stroke="gray"
                                stroke-width="1"
                            />
                        </pattern>
                    </defs>

                    <rect
                        x="-2000"
                        y="-2000"
                        width="4000"
                        height="4000"
                        fill="url(#grid)"
                    />
                    <EntityMarker
                        v-for="(marker, index) in markers"
                        :key="`${marker.name}-${index}`"
                        :marker="marker"
                        :dragging="isDragging"
                        @editMarker="editMarker"
                        @pickUp="pickUpMarker"
                    />
                </svg>
                <div
                    id="trashArea"
                    ref="trashArea"
                    :style="trashAreaStyle"
                    @mousemove="onMousemove"
                    @mouseup="putDownMarker"
                >
                    <b-icon-trash style="margin-right: 1rem" />
                    <span>Drag Here to Delete</span>
                </div>
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
                mData.condition,
                mData.height,
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
                markerToUpdate.setCondition(updatedMarker.condition);
                markerToUpdate.setHeight(updatedMarker.height);
            }
        });

        window.addEventListener('resize', () => {
            this.pageResized = !this.pageResized;
        });
    },
    data() {
        return {
            map: new BattleMap(),
            selectedMarker: undefined as Marker | undefined,
            selectedMarkerRef: undefined as HTMLElement | undefined,
            editingMarker: undefined as Marker | undefined,
            isDragging: false,
            currentLocation: {
                x: 0,
                y: 0,
            },
            pageResized: false,
        };
    },
    methods: {
        addMarker(markerForm: {
            name: string;
            color: string;
            fontColor: string;
            size: string;
            condition: string;
            height: number;
        }): void {
            const { name, color, fontColor, size, condition, height } =
                markerForm;

            const marker = new Marker(
                name,
                color,
                fontColor,
                500,
                500,
                +size,
                condition,
                height
            );
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
        pickUpMarker(data: any): void {
            this.selectedMarker = data.marker;
            this.selectedMarkerRef = data.ref;
            this.isDragging = true;
        },
        putDownMarker(): void {
            if (this.selectedMarker && this.isDragging) {
                this.isDragging = false;

                if (this.selectedMarkerTrashHover) {
                    this.removeMarker(this.selectedMarker.id);
                    return;
                }

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
            this.pageResized;
            const map = this.$refs.map as SVGGraphicsElement;
            return map.getScreenCTM();
        },
        selectedMarkerTrashHover(): boolean {
            this.currentLocation.x;
            this.currentLocation.y;
            if (!this.selectedMarkerRef) return false;

            const trashArea = this.$refs.trashArea as HTMLElement;

            const markerBB = this.selectedMarkerRef.getBoundingClientRect();
            const trashBB = trashArea.getBoundingClientRect();

            return !(
                markerBB.right < trashBB.left ||
                markerBB.left > trashBB.right ||
                markerBB.bottom < trashBB.top ||
                markerBB.top > trashBB.bottom
            );
        },
        trashAreaStyle(): { [key: string]: string } {
            const bottom = this.isDragging ? '0' : '-10%';
            const backgroundColor = this.selectedMarkerTrashHover
                ? 'red'
                : '#000';

            return {
                '--trash-bottom': bottom,
                '--trash-bg-color': backgroundColor,
            };
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
    background: lightgrey;
    height: 100%;
    width: 100%;
}

#battleMapCol {
    position: relative;
}

#trashArea {
    position: absolute;
    bottom: var(--trash-bottom);
    padding: 0.5rem 0.5rem;
    border-radius: 1rem 1rem 0 0;
    font-size: 1.25rem;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    right: 0;
    left: 0;

    background-color: var(--trash-bg-color);
    color: #fff;
    opacity: 0.7;

    transition: bottom 0.25s ease-in-out;
}

#trashArea:hover {
    cursor: grabbing;
}
</style>
