<template>
    <b-alert class="dice-result" show variant="dark" fade>
        <div class="roll-metadata">
            <span class="roll-player">{{ playerId }}</span>
            <span class="roll-time" v-if="time">({{ time }})</span>
        </div>

        <div class="dice-section">
            <IndividualDie
                v-for="(die, index) in diceSections.twenties"
                :key="`${die.dieType}-${index}`"
                :dieType="die.dieType"
                :value="die.value"
                :ignore="die.ignore"
                :index="0"
                :static="static"
                @done="rollDone"
            />
            <IndividualDie
                v-for="(die, index) in diceSections.others"
                :key="`${die.dieType}-${index}`"
                :dieType="die.dieType"
                :value="die.value"
                :ignore="die.ignore"
                :index="diceSections.twenties.length + index"
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
import { defineComponent } from 'vue';
import RollResult from '@/models/RollResult';

import IndividualDie from './IndividualDie.vue';

export default defineComponent({
    name: 'DiceResult',
    components: {
        IndividualDie,
    },
    props: {
        roll: { type: RollResult, required: true },
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
        playerId(): string {
            return this.roll.playerId;
        },
        dice(): Array<{
            dieType: number;
            value: number;
            ignore: boolean;
        }> {
            return this.roll.toDiceArray();
        },
        diceSections(): {
            [key: string]: Array<{
                dieType: number;
                value: number;
                ignore: boolean;
            }>;
        } {
            const d20s = this.dice.filter((d) => d.dieType === 20);
            const others = this.dice.filter((d) => d.dieType !== 20);
            return {
                twenties: d20s,
                others: others,
            };
        },
        rollingDone(): boolean {
            return this.rollsCompleted === this.roll.numDice();
        },
        rollComponents(): string {
            const value = this.roll.value();
            const modifier = this.roll.modifier;
            const operator = modifier < 0 ? '-' : '+';

            return `${value} ${operator} ${Math.abs(modifier)} =`;
        },
    },
});
</script>

<style scoped>
.roll-metadata {
    display: grid;
    grid-template-rows: 1fr min-content;
}
.roll-player {
    font-weight: bold;
}
.roll-time {
    font-size: 0.8rem;
}
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
