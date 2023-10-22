<template>
    <div class="roll-log">
        <h3 class="title">Roll History</h3>
        <div class="rolls">
            <DiceResult
                v-for="(roll, index) in rolls"
                :key="`${roll.timestamp}-${index}`"
                :roll="roll.rollResult"
                :static="true"
                :time="time(roll.timestamp)"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import DiceResult from './DiceResult.vue';

export default Vue.extend({
    name: 'RollLog',
    components: {
        DiceResult,
    },
    props: {
        rolls: Array,
    },
    methods: {
        time(timestamp: number): string {
            return new Date(timestamp).toLocaleString();
        },
    },
});
</script>

<style scoped>
.roll-log {
    padding: 1rem;
    display: block;
    height: 100%;
}

.title {
    text-align: left;
    height: fit-content;
    width: 100%;
}

.rolls {
    height: 100%;
    overflow-y: auto;
    padding-bottom: 1rem;
}
</style>
