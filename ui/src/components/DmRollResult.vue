<template>
    <b-alert class="dm-roll dice-result" show variant="dark" fade>
        <div class="roll-metadata">
            <span class="roll-player">THE DM HAS ROLLED</span>
            <span class="roll-time" v-if="time">({{ time }})</span>
        </div>

        <div class="dice-section">
            <Transition name="fade">
                <div
                    class="dm-roll-value"
                    v-if="!rollDone && !static"
                    animation="spin"
                >
                    <b-icon class="question-icon" icon="question-circle" />
                </div>
                <div v-else>
                    <span
                        class="dm-roll-value"
                        :class="{
                            'crit-success': critSuccess,
                            'crit-fail': critFail,
                            'normal-result': normalResult,
                        }"
                    >
                        {{ result }}
                    </span>
                </div>
            </Transition>
        </div>
    </b-alert>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'DmRollResult',
    props: {
        result: String,
        show: Boolean,
        static: Boolean,
        time: String,
    },
    data() {
        return {
            rollDone: false,
        };
    },
    mounted() {
        setTimeout(() => {
            this.rollDone = true;
        }, 1000);
    },
    methods: {},
    computed: {
        critSuccess() {
            return this.result === 'NAT 20';
        },
        critFail() {
            return this.result === 'NAT 1';
        },
        normalResult() {
            return !this.critSuccess && !this.critFail;
        },
    },
});
</script>

<style scoped>
@keyframes spinning {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.question-icon {
    animation: spinning 0.8s linear infinite;
}

.dm-roll-value {
    font-size: 250%;
    font-weight: bold;
}

.crit-success {
    color: var(--bs-success);
}
.crit-fail {
    color: var(--bs-danger);
}

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
