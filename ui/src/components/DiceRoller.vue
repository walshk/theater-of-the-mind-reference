<template>
    <div class="dice-roller">
        <h3 class="title">Roll Dice</h3>
        <div class="dice-selector">
            <DiceD20
                class="dice"
                :size="diceSize"
                @click="handleClick($event, DICE.d20)"
            />
            <DiceD12
                class="dice"
                :size="diceSize"
                @click="handleClick($event, DICE.d12)"
            />
            <DiceD10
                class="dice"
                :size="diceSize"
                @click="handleClick($event, DICE.d10)"
            />
            <DiceD8
                class="dice"
                :size="diceSize"
                @click="handleClick($event, DICE.d8)"
            />
            <DiceD6
                class="dice"
                :size="diceSize"
                @click="handleClick($event, DICE.d6)"
            />
            <DiceD4
                class="dice"
                :size="diceSize"
                @click="handleClick($event, DICE.d4)"
            />
            <b-form-input
                type="number"
                min="0"
                v-model="diceAmounts[DICE.d20]"
                class="dice-amounts amount-d20"
            ></b-form-input>
            <b-form-input
                type="number"
                min="0"
                v-model="diceAmounts[DICE.d12]"
                class="dice-amounts amount-d12"
            ></b-form-input>
            <b-form-input
                type="number"
                min="0"
                v-model="diceAmounts[DICE.d10]"
                class="dice-amounts amount-d10"
            ></b-form-input>
            <b-form-input
                type="number"
                min="0"
                v-model="diceAmounts[DICE.d8]"
                class="dice-amounts amount-d8"
            ></b-form-input>
            <b-form-input
                type="number"
                min="0"
                v-model="diceAmounts[DICE.d6]"
                class="dice-amounts amount-d6"
            ></b-form-input>
            <b-form-input
                type="number"
                min="0"
                v-model="diceAmounts[DICE.d4]"
                class="dice-amounts amount-d4"
            ></b-form-input>
        </div>
        <div class="modifier">
            <div class="modifier-title">Modifier:</div>
            <b-form-spinbutton
                v-model="modifier"
                min="-100"
                max="100"
            ></b-form-spinbutton>
        </div>
        <div class="roll-button">
            <b-button variant="success" @click="rollDice">Roll</b-button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import DiceD20 from 'vue-material-design-icons/DiceD20.vue';
import DiceD12 from 'vue-material-design-icons/DiceD12.vue';
import DiceD10 from 'vue-material-design-icons/DiceD10.vue';
import DiceD8 from 'vue-material-design-icons/DiceD8.vue';
import DiceD6 from 'vue-material-design-icons/DiceD6.vue';
import DiceD4 from 'vue-material-design-icons/DiceD4.vue';

export default Vue.extend({
    name: 'DiceRoller',
    components: {
        DiceD20,
        DiceD12,
        DiceD10,
        DiceD8,
        DiceD6,
        DiceD4,
    },
    data() {
        return {
            DICE: {
                d20: 20,
                d12: 12,
                d10: 10,
                d8: 8,
                d6: 6,
                d4: 4,
            },
            diceAmounts: {
                20: 0,
                12: 0,
                10: 0,
                8: 0,
                6: 0,
                4: 0,
            } as { [key: number]: number },
            modifier: 0,
            diceSize: 40,
        };
    },
    methods: {
        handleClick(event: MouseEvent, diceValue: number): void {
            event.preventDefault();
            this.diceAmounts[diceValue] = +this.diceAmounts[diceValue] + 1;
        },
        getRandomInt(min: number, max: number) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        },
        rollDice() {
            let rollValues = {} as { [key: number]: Array<number> };
            for (let dieValue in this.diceAmounts) {
                if (!Object.keys(rollValues).includes(dieValue)) {
                    rollValues[dieValue] = [];
                }

                for (let i = 0; i < this.diceAmounts[dieValue]; i++) {
                    const roll = this.getRandomInt(1, +dieValue + 1);
                    rollValues[dieValue].push(roll);
                }
            }
            this.$emit('diceRoll', {
                dice: rollValues,
                modifier: this.modifier,
            });
        },
    },
});
</script>

<style scoped>
.dice-roller {
    display: grid;

    grid-template-rows: repeat(4, min-content) 1fr;
    grid-template-columns: 1fr;

    padding: 1rem;
    height: 100%;
}

.title {
    grid-row: 1;

    text-align: left;
    margin-bottom: 2rem;
}

.dice-selector {
    grid-row: 2;

    display: grid;
    grid-template-rows: min-content min-content;
    grid-template-columns: repeat(6, 1fr);
}

.dice {
    grid-row: 1;
}

.dice-amounts {
    grid-row: 2;
    text-align: center;
    padding: 0;
}

.modifier,
.roll-button {
    margin-top: 1rem;
}
</style>

<style>
.dice > svg {
    cursor: pointer;
    filter: drop-shadow(0px 0px 0px rgb(0 0 0 / 0.2));
    transition: all 0.1s ease-out;
}

.dice > svg:hover {
    cursor: pointer;
    filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.2));
}
</style>
