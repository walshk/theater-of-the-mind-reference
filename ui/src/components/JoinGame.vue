<template>
    <b-container class="join-game" fluid>
        <div class="join-title">Theater of the Mind Reference</div>
        <div class="join-input">
            <b-form-group label="Please enter a Game ID to join:">
                <b-form-input
                    v-model="gameId"
                    placeholder="my-fun-little-game"
                    @keyup="submitIfEnter"
                ></b-form-input>
            </b-form-group>
        </div>
        <div class="join-button">
            <b-button variant="success" @click="joinGame"> Join Game </b-button>
        </div>
    </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import API from '@/api';

export default Vue.extend({
    name: 'JoinGame',
    data() {
        return {
            gameId: '',
        };
    },
    methods: {
        async joinGame(): Promise<void> {
            try {
                await API.post(`/join/${encodeURIComponent(this.gameId)}`);
                this.$emit('joinedGame', this.gameId);
            } catch (err) {
                console.error('Error joining game: ', err);
            }
        },
        submitIfEnter(event: KeyboardEvent) {
            if (event.key === 'Enter') {
                this.joinGame();
            }
        },
    },
    computed: {},
});
</script>

<style scoped>
.join-game {
    background-color: #1b1b1b;
    height: 100%;
    width: 100%;

    display: grid;
    grid-template-rows: 2fr 1fr 1fr 3fr;
    grid-template-columns: 1fr;

    color: #eee;
}

.join-title {
    grid-row: 1;

    color: #eee;
    font-size: 2rem;
    align-self: flex-end;
    padding-bottom: 1rem;
}

.join-input {
    grid-row: 2;
    margin: 10% 30%;
}

.join-button {
    grid-row: 3;
}
</style>
