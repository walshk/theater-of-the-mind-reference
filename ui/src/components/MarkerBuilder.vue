<template>
    <b-container class="marker-builder" fluid>
        <b-row style="margin-bottom: 1rem">
            <b-col>
                <h3>Add New Marker</h3>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form @submit="submit">
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
                        <b-form-select
                            id="marker-size"
                            v-model="form.size"
                            :options="sizeOptions"
                        ></b-form-select>
                    </b-form-group>
                </b-form>
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
                <b-button v-if="!marker" variant="success" @click="createMarker"
                    >Add Marker</b-button
                >
                <b-button v-if="marker" variant="success" @click="updateMarker">
                    Update Marker
                </b-button>
                <b-button
                    v-if="marker"
                    variant="secondary"
                    @click="deselectMarker"
                    style="margin-left: 1rem"
                >
                    Cancel
                </b-button>
            </b-col>
        </b-row>
        <b-row style="text-align: center; margin-top: 3rem">
            <b-col>
                <b-button v-if="marker" variant="danger" @click="removeMarker"
                    >Remove Marker</b-button
                >
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import Marker from '@/models/Marker';
import Vue from 'vue';

export default Vue.extend({
    name: 'MarkerBuilder',
    props: {
        marker: Marker,
    },
    mounted() {
        if (this.marker) {
            this.form.name = this.marker.name;
            this.form.color = this.marker.color;
            this.form.fontColor = this.marker.fontColor;
            this.form.size = this.marker.radius;
        }
    },
    data() {
        return {
            form: {
                name: '',
                color: '#00BFFF',
                fontColor: '#000',
                size: 50,
            },
            formDefaults: {
                name: '',
                color: '#00BFFF',
                fontColor: '#000',
                size: 50,
            },
            sizeOptions: [
                { text: 'Tiny', value: 25 },
                { text: 'Small/Medium', value: 50 },
                { text: 'Large', value: 100 },
                { text: 'Huge', value: 150 },
                { text: 'Gargantuan', value: 200 },
            ],
        };
    },
    methods: {
        submit(event: SubmitEvent) {
            event.preventDefault();

            if (this.marker) {
                this.updateMarker();
            } else {
                this.createMarker();
            }
        },
        createMarker(): void {
            this.$emit('createMarker', this.form);

            this.form.name = '';
        },
        updateMarker(): void {
            this.marker.setName(this.form.name);
            this.marker.setColor(this.form.color);
            this.marker.setFontColor(this.form.fontColor);
            this.marker.setRadius(+this.form.size);

            this.$emit('updateMarker');
            this.form = Object.assign({}, this.formDefaults);
        },
        removeMarker(): void {
            if (this.marker) {
                this.$emit('removeMarker', this.marker.id);
                this.form = Object.assign({}, this.formDefaults);
            }
        },
        deselectMarker(): void {
            this.$emit('cancelEdit');
            this.form = Object.assign({}, this.formDefaults);
        },
    },
    watch: {
        marker: function (newMarker: Marker | undefined) {
            if (newMarker) {
                this.form.name = newMarker.name;
                this.form.color = newMarker.color;
                this.form.fontColor = newMarker.fontColor;
                this.form.size = newMarker.radius;
            }
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
