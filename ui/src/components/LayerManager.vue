<template>
    <div class="layer-manager">
        <h3 class="title">Manage Layers</h3>
        <div class="layers">
            <draggable v-model="markerLayers" @update="dropLayer">
                <div
                    v-for="markerLayer in markerLayers"
                    :key="markerLayer.id"
                    class="marker-layer"
                >
                    <div class="marker-layer-area">
                        <div v-html="markerLayer.toSvgString()"></div>
                        <div class="marker-layer-name">
                            {{ truncateMarkerName(markerLayer.name) }}
                        </div>
                    </div>
                </div>
            </draggable>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import Marker from '@/models/Marker';
import draggable from 'vuedraggable';

export default defineComponent({
    name: 'LayerManager',
    components: {
        draggable,
    },
    props: {
        markers: { type: Array as PropType<Array<Marker>>, required: true },
    },
    created() {
        this.markerLayers = this.markers.slice().reverse();
    },
    data() {
        return {
            markerLayers: [] as Array<Marker>,
        };
    },
    methods: {
        truncateMarkerName(name: string) {
            if (name.length > 14) {
                return name.slice(0, 14) + '...';
            }
            return name;
        },
        dropLayer() {
            for (let i = 0; i < this.markerLayers.length; i++) {
                const marker = this.markerLayers[i];
                if (marker.layer !== this.markerLayers.length - i) {
                    marker.setLayer(this.markerLayers.length - i);
                }
            }
            this.$emit('updateMarkerLayers');
        },
    },
    watch: {
        markers: function (newVal: Array<Marker>) {
            this.markerLayers = newVal.slice().reverse();
        },
    },
});
</script>

<style scoped>
.layer-manager {
    padding: 1rem;
    display: block;
    height: 100%;
}

.title {
    text-align: left;
    height: fit-content;
    width: 100%;
}

.layers {
    height: 100%;
    overflow-y: auto;
    padding-bottom: 1rem;
}

.marker-layer-area {
    background-color: var(--bs-gray-dark);
    margin-bottom: 6px;
    border-radius: 6px;

    display: flex;
    align-items: center;
    font-size: 1.25rem;
    gap: 1rem;
    padding: 0.25rem 0 0.25rem 1rem;
}
.marker-layer-area:hover {
    cursor: pointer;
    background-color: var(--bs-gray-700);
}

.marker-layer-name {
    color: white;
}

:global(.marker-layer-svg) {
    height: 4vh;
}
</style>
