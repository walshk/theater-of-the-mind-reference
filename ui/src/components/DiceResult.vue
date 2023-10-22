<template>
    <b-alert class="dice-result" show variant="dark" fade>
        <div v-if="time">{{ time }}</div>
        <div class="dice-section">
            <IndividualDie
                v-for="(die, index) in dice"
                :key="`${die.dieType}-${index}`"
                :dieType="die.dieType"
                :value="die.value"
                :index="index"
                :static="static"
                @done="rollDone"
            />
        </div>
        <Transition name="fade">
            <div v-if="rollingDone || static" class="roll-value">
                <span class="components">
                    {{ rollComponents }}
                </span>
                <span class="total-value"
                    >&nbsp;{{ roll.value() + roll.modifier }}</span
                >
            </div>
        </Transition>
    </b-alert>
</template>

<script lang="ts">
import Vue from 'vue';
import RollResult from '@/models/RollResult';

import IndividualDie from './IndividualDie.vue';

export default Vue.extend({
    name: 'DiceResult',
    components: {
        IndividualDie,
    },
    props: {
        roll: RollResult,
        show: Boolean,
        static: Boolean,
        time: String,
    },
    data() {
        return {
            rollsCompleted: 0,
        };
    },
    methods: {
        rollDone(): void {
            this.rollsCompleted += 1;
        },
    },
    computed: {
        dice() {
            return this.roll.toDiceArray();
        },
        rollingDone(): boolean {
            return this.rollsCompleted === this.roll.numDice();
        },
        rollComponents(): string {
            const value = this.roll.value();
            const modifier = this.roll.modifier;
            const operator = modifier < 0 ? '-' : '+';
            const total = value + modifier;

            return `${value} ${operator} ${Math.abs(modifier)} =`;
        },
    },
});
</script>

<style scoped>
.dice-result {
    display: grid;
    grid-template-rows: min-content 1fr;
    grid-template-columns: 1fr;
    grid-row-gap: 1rem;
}

.dice-section {
    display: inline-block;
}

.roll-value {
    border-top: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
}

.components {
    font-size: 150%;
}

.total-value {
    font-size: 250%;
    font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
