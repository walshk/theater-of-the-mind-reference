<template>
    <b-container class="marker-builder" fluid>
        <b-row style="margin-bottom: 1rem">
            <b-col>
                <h3 v-if="!marker">Add New Marker</h3>
                <h3 v-else>Edit Marker</h3>
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
                        label-for="marker-font-color"
                    >
                        <b-form-input
                            id="marker-font-color"
                            v-model="form.fontColor"
                            type="color"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        id="input-name-group"
                        class="marker-form-group"
                        label="Size"
                        label-for="marker-size"
                    >
                        <b-form-select
                            id="marker-size"
                            style="
                                width: 100%;
                                text-align: center;
                                padding: 0.5rem 0rem;
                            "
                            v-model="form.size"
                            :options="sizeOptions"
                        ></b-form-select>
                    </b-form-group>
                    <b-form-group
                        id="input-condition-group"
                        class="marker-form-group"
                        label="Condition"
                        label-for="marker-condition"
                    >
                        <b-form-input
                            id="marker-condition"
                            v-model="form.condition"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        id="input-height-group"
                        class="marker-form-group"
                        label="Flying Height"
                        label-for="marker-height"
                    >
                        <b-form-input
                            id="marker-height"
                            v-model="form.height"
                            type="number"
                            min="0"
                        ></b-form-input>
                    </b-form-group>
                </b-form>
            </b-col>
        </b-row>
        <b-row style="text-align: center; height: 30%">
            <b-col style="text-align: center; height: 100%">
                <svg width="100%" height="100%" viewBox="0 0 400 400">
                    <g class="entity-marker">
                        <circle
                            v-if="form.condition.length > 0"
                            class="circle"
                            :cx="200"
                            :cy="200"
                            :r="+form.size + 4"
                            fill="none"
                            stroke="red"
                            stroke-width="5px"
                            stroke-dasharray="1"
                            opacity="0.7"
                        />
                        <circle
                            class="border-circle"
                            :fill="'black'"
                            :cx="200"
                            :cy="200"
                            :r="+form.size"
                        ></circle>
                        <circle
                            :fill="form.color"
                            :cx="200"
                            :cy="200"
                            :r="+form.size - 2"
                        ></circle>
                        <text
                            class="marker-name"
                            :x="200"
                            :y="200"
                            :style="`font-size: ${+form.size / 2}px`"
                            :fill="form.fontColor"
                            text-anchor="middle"
                            dy=".3em"
                        >
                            {{ form.name }}
                        </text>
                        <text
                            class="condition-text"
                            :x="200"
                            :y="200 + form.size + 16"
                            text-anchor="middle"
                            fill="#000"
                            :style="`font-size: 12px;`"
                        >
                            {{ form.condition }}
                        </text>
                        <text
                            class="height-text"
                            :x="200"
                            :y="200 + form.size / 1.2"
                            text-anchor="middle"
                            fill="#000"
                            :style="`font-size: ${form.size / 3}px;`"
                        >
                            {{ formHeight }}
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
            this.form.condition = this.marker.condition;
            this.form.height = this.marker.height;
        }
    },
    data() {
        return {
            form: {
                name: '',
                color: '#00BFFF',
                fontColor: '#000',
                size: 40,
                condition: '',
                height: 0,
            },
            formDefaults: {
                name: '',
                color: '#00BFFF',
                fontColor: '#000',
                size: 40,
                condition: '',
                height: 0,
            },
            sizeOptions: [
                { text: 'Tiny', value: 20 },
                { text: 'Small/Medium', value: 40 },
                { text: 'Large', value: 80 },
                { text: 'Huge', value: 120 },
                { text: 'Gargantuan', value: 160 },
            ],
        };
    },
    methods: {
        submit(event: SubmitEvent) {
            event.preventDefault();
            console.log('submitted');

            if (this.marker) {
                this.updateMarker();
            } else {
                this.createMarker();
            }
        },
        createMarker(): void {
            this.$emit('createMarker', this.form);

            this.form.name = '';
            this.form.condition = '';
            this.form.height = 0;
        },

        updateMarker(): void {
            this.marker.setName(this.form.name);
            this.marker.setColor(this.form.color);
            this.marker.setFontColor(this.form.fontColor);
            this.marker.setRadius(+this.form.size);
            this.marker.setCondition(this.form.condition);
            this.marker.setHeight(this.form.height);

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
    computed: {
        formHeight(): string {
            return +this.form.height > 0 ? `${this.form.height}ft` : '';
        },
    },
    watch: {
        marker: function (newMarker: Marker | undefined) {
            if (newMarker) {
                this.form.name = newMarker.name;
                this.form.color = newMarker.color;
                this.form.fontColor = newMarker.fontColor;
                this.form.size = newMarker.radius;
                this.form.condition = newMarker.condition;
                this.form.height = newMarker.height;
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
    overflow-y: auto;
}

.marker-form-group {
    margin-bottom: 1rem;
    font-size: 1rem;
}

input {
    width: 100% !important;
}
</style>
