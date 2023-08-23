<template>
    <g class="entity-marker">
        <circle
            class="border-circle"
            fill="black"
            :cx="marker.x"
            :cy="marker.y"
            r="26"
        ></circle>
        <circle
            :fill="marker.color"
            :cx="marker.x"
            :cy="marker.y"
            r="25"
        ></circle>
        <text
            class="marker-name"
            x="50%"
            y="50%"
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
    },
    created() {
        console.log('Mounted Marker', this.marker);
    },
});
</script>

<style scoped>
.entity-marker:hover {
    border: 2px solid black;
    cursor: grab;
}
.marker-name {
    font-size: 50%;
}
</style>
