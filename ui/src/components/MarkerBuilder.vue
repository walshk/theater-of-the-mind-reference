<template>
    <b-container class="marker-builder" fluid>
        <b-row style="margin-bottom: 1rem">
            <b-col>
                <h3>Add New Marker</h3>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form @submit="createMarker">
                    <b-form-group
                        id="input-name-group"
                        class="marker-form-group"
                        label="Label"
                        label-for="marker-label"
                    >
                        <b-form-input
                            id="marker-label"
                            v-model="form.name"
                            type="text"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        id="input-color-group"
                        class="marker-form-group"
                        label="Marker Color"
                        label-for="marker-color"
                    >
                        <b-form-input
                            id="marker-color"
                            v-model="form.color"
                            type="color"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        id="input-font-color-group"
                        class="marker-form-group"
                        label="Font Color"
                        label-for="marker-color"
                    >
                        <b-form-input
                            id="marker-font-color"
                            v-model="form.fontColor"
                            type="color"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        id="input-name-group"
                        label="Size"
                        label-for="marker-size"
                    >
                        <b-form-input
                            id="marker-size"
                            v-model="form.size"
                            type="range"
                            min="20"
                            max="150"
                        ></b-form-input>
                    </b-form-group>
                </b-form>
            </b-col>
        </b-row>
        <b-row style="text-align: center; margin-top: 25%">
            <b-col>
                <h4>Marker Preview</h4>
            </b-col>
        </b-row>
        <b-row style="text-align: center">
            <b-col>
                <svg width="100%" height="100%" viewBox="0 0 300 300">
                    <g class="entity-marker">
                        <circle
                            class="border-circle"
                            fill="black"
                            :cx="150"
                            :cy="150"
                            :r="+form.size + 2"
                        ></circle>
                        <circle
                            :fill="form.color"
                            :cx="150"
                            :cy="150"
                            :r="+form.size"
                        ></circle>
                        <text
                            class="marker-name"
                            :x="150"
                            :y="150"
                            :style="`font-size: ${+form.size / 2}`"
                            :fill="form.fontColor"
                            text-anchor="middle"
                            dy=".3em"
                        >
                            {{ form.name }}
                        </text>
                    </g>
                </svg>
            </b-col>
        </b-row>
        <b-row style="text-align: center">
            <b-col>
                <b-button variant="success" @click="createMarker"
                    >Add Marker</b-button
                >
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'MarkerBuilder',
    data() {
        return {
            form: {
                name: '',
                color: '#00BFFF',
                fontColor: '#000',
                size: '50',
            },
        };
    },
    methods: {
        createMarker(event: SubmitEvent | PointerEvent): void {
            event.preventDefault();
            this.$emit('createMarker', this.form);

            this.form.name = '';
        },
    },
});
</script>

<style>
.marker-builder {
    height: 100%;
    width: 100%;

    padding-top: 1rem;
    text-align: left;
}

.marker-form-group {
    margin-bottom: 1rem;
}

input {
    width: 100% !important;
}
</style>
