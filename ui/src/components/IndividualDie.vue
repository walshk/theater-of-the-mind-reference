<template>
    <span class="die-span">
        <span
            v-if="!rolling"
            class="individual-die"
            :class="{ crit: crit, fail: fail, ignore: ignore }"
        >
            <b-icon :icon="dieIcon"></b-icon>
            <span class="die-value">{{ value }}</span>
        </span>
        <span v-if="rolling">
            <div class="individual-die spinning">
                <b-icon :icon="dieIcon"></b-icon>
            </div>
        </span>
    </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'IndividualDie',
    props: {
        dieType: {
            type: Number,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
        ignore: {
            type: Boolean,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
        static: Boolean,
    },
    data() {
        return {
            icons: {
                20: 'hexagon-fill',
                12: 'pentagon-fill',
                10: 'diamond-fill',
                8: 'diamond-fill',
                6: 'square-fill',
                4: 'triangle-fill',
            } as { [key: number]: string },
            rolling: true,
            rollTimeMs: 1000,
        };
    },
    created() {
        if (this.static) {
            this.rolling = false;
        }
    },
    mounted() {
        setTimeout(() => {
            this.rolling = false;
            this.$emit('done');
        }, this.rollTimeMs + this.index * 300);
    },
    computed: {
        dieIcon(): string {
            return this.icons[this.dieType];
        },
        crit(): boolean {
            if (this.dieType !== 20) return false;

            return this.value === 20;
        },
        fail(): boolean {
            if (this.dieType !== 20) return false;

            return this.value === 1;
        },
    },
});
</script>

<style scoped>
.die-span {
    display: inline-block;
    width: fit-content;
    padding: 0.25rem 0.25rem;
}
.individual-die {
    position: relative;
    font-size: 250%;
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: monospace;
    color: var(--bs-primary);
    width: fit-content;
}

.die-value {
    position: absolute;
    scale: 60%;
    text-align: center;
    color: #fff;
}

.individual-die.crit {
    color: var(--bs-success);
}

.individual-die.fail {
    color: var(--bs-danger);
}

.individual-die.ignore {
    color: var(--bs-gray-600) !important;
}

.spinning {
    animation: spinning 0.8s linear infinite;
}

@keyframes spinning {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
