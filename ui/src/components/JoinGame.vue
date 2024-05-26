<template>
    <b-container class="join-game" fluid>
        <div class="join-title">Theater of the Mind Reference</div>
        <div class="join-input">
            <b-form-group label="Game ID" label-for="game-id">
                <b-form-input
                    id="game-id"
                    v-model="gameId"
                    placeholder="my-fun-little-game"
                    @keyup="submitIfEnter"
                ></b-form-input>
            </b-form-group>

            <b-form-group label="Player Name" label-for="player-name">
                <b-form-input
                    id="player-name"
                    v-model="playerId"
                    placeholder="Vincent Adultman"
                    @keyup="submitIfEnter"
                ></b-form-input>
            </b-form-group>
        </div>
        <div class="join-button">
            <b-button
                variant="success"
                @click="joinGame"
                :disabled="playerId.length === 0 || gameId.length === 0"
            >
                Join Game
            </b-button>
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
            playerId: '',
        };
    },
    methods: {
        async joinGame(): Promise<void> {
            try {
                await API.post(`/join/${encodeURIComponent(this.gameId)}`, {
                    playerId: this.playerId,
                });
                this.$emit('joinedGame', this.gameId, this.playerId);
            } catch (err) {
                console.error('Error joining game: ', err);
            }
        },
        submitIfEnter(event: KeyboardEvent) {
            if (this.gameId.length === 0 || this.playerId.length === 0) {
                return;
            }

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

    display: grid;
    grid-template-rows: repeat(2, 1fr);
    row-gap: 1rem;
}

.join-button {
    grid-row: 3;
}
</style>
