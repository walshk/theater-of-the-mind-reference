<template>
    <g
        class="entity-marker"
        :style="markerStyles"
        @mousedown="pickUp"
        @click.right="edit"
        ref="marker"
    >
        <circle
            v-if="marker.condition.length > 0"
            class="circle"
            :cx="marker.x"
            :cy="marker.y"
            :r="marker.radius + 4"
            fill="none"
            stroke="red"
            stroke-width="5px"
            stroke-dasharray="1"
            opacity="0.7"
        />
        <circle
            class="border-circle"
            fill="black"
            :cx="marker.x"
            :cy="marker.y"
            :r="marker.radius"
        ></circle>
        <circle
            :fill="marker.color"
            :cx="marker.x"
            :cy="marker.y"
            :r="marker.radius - 2"
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
        <text
            class="condition-text"
            :x="marker.x"
            :y="marker.y + marker.radius + 16"
            fill="#000"
            text-anchor="middle"
            :style="`font-size: 12px;`"
        >
            {{ marker.condition }}
        </text>
        <text
            class="height-text"
            :x="marker.x"
            :y="marker.y + marker.radius / 1.5"
            text-anchor="middle"
            :fill="marker.fontColor"
            :style="`font-size: ${marker.radius / 3}px;`"
        >
            {{ markerHeight }}
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
                this.$emit('pickUp', {
                    marker: this.marker,
                    ref: this.$refs.marker,
                });
            }
        },
        edit(event: MouseEvent): void {
            event.preventDefault();
            this.$emit('editMarker', this.marker);
        },
    },
    computed: {
        markerStyles(): { [key: string]: string } {
            const cursor = this.dragging ? 'grabbing' : 'grab';
            const shadow =
                this.marker.height > 0
                    ? 'drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))'
                    : 'drop-shadow(0)';
            return {
                '--hover-cursor': cursor,
                '--marker-shadow': shadow,
            };
        },
        borderColor(): string {
            return this.marker.condition.length > 0 ? 'red' : 'black';
        },
        markerHeight(): string {
            return +this.marker.height > 0 ? `${this.marker.height}ft` : '';
        },
    },
});
</script>

<style scoped>
.entity-marker {
    filter: var(--marker-shadow);
}

.entity-marker:hover {
    border: 2px solid black;
    cursor: var(--hover-cursor);
}
.marker-name {
    font-size: 50%;
}
</style>
