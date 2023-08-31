<template>
    <g
        class="entity-marker"
        :style="markerStyles"
        @mousedown="pickUp"
        @click.right="remove"
        ref="marker"
    >
        <circle
            class="border-circle"
            fill="black"
            :cx="marker.x"
            :cy="marker.y"
            :r="marker.radius + 2"
        ></circle>
        <circle
            :fill="marker.color"
            :cx="marker.x"
            :cy="marker.y"
            :r="marker.radius"
        ></circle>
        <text
            class="marker-name"
            :x="marker.x"
            :y="marker.y"
            :style="`font-size: ${marker.radius / 2}`"
            :fill="marker.fontColor"
            text-anchor="middle"
            dy=".3em"
        >
            {{ marker.name }}
        </text>
    </g>
</template>

<script lang="ts">
import Vue from 'vue';

import Marker from '@/models/Marker';

export default Vue.extend({
    name: 'EntityMarker',
    props: {
        marker: Marker,
        dragging: Boolean,
    },
    methods: {
        async pickUp(event: MouseEvent): Promise<void> {
            event.preventDefault();

            if (event.button !== 2) {
                this.$emit('pickUp', this.marker);
            }
        },
        remove(event: MouseEvent): void {
            event.preventDefault();
            this.$emit('removeMarker', this.marker.id);
        },
    },
    computed: {
        markerStyles(): { [key: string]: string } {
            const cursor = this.dragging ? 'grabbing' : 'grab';
            return {
                '--hover-cursor': cursor,
            };
        },
    },
});
</script>

<style scoped>
.entity-marker:hover {
    border: 2px solid black;
    cursor: var(--hover-cursor);
}
.marker-name {
    font-size: 50%;
}
</style>
