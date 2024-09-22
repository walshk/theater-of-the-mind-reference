<template>
    <div class="roll-log">
        <h3 class="title">Roll History</h3>
        <div class="rolls">
            <div
                v-for="(roll, index) in allRolls"
                :key="`${roll.timestamp}-${index}`"
            >
                <DmRollResult
                    v-if="roll.type === 'dm'"
                    :result="roll.data"
                    :static="true"
                    :time="time(roll.timestamp)"
                />
                <DiceResult
                    v-else
                    :roll="roll.data.rollResult"
                    :static="true"
                    :time="time(roll.timestamp)"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DiceResult from './DiceResult.vue';
import DmRollResult from './DmRollResult.vue';

export default defineComponent({
    name: 'RollLog',
    components: {
        DiceResult,
        DmRollResult,
    },
    props: ['rolls', 'dmRolls'],
    methods: {
        time(timestamp: number): string {
            return new Date(timestamp).toLocaleString();
        },
    },
    computed: {
        allRolls(): any[] {
            const normalRolls = this.rolls.map((rollData: any) => {
                return {
                    type: 'normal',
                    data: rollData,
                    timestamp: rollData.timestamp,
                };
            });
            const dmRolls = this.dmRolls.map((rollData: any) => {
                return {
                    type: 'dm',
                    data: rollData.result,
                    timestamp: rollData.timestamp,
                };
            });
            return normalRolls
                .concat(dmRolls)
                .sort(
                    (
                        a: { type: string; data: any; timestamp: number },
                        b: { type: string; data: any; timestamp: number }
                    ) => {
                        return b.timestamp - a.timestamp;
                    }
                );
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
