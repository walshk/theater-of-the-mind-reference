<template>
    <div id="app">
        <span v-if="gameJoined" class="back-button" @click="goBack"
            ><b-icon-arrow-left /> Back</span
        >
        <BattleMap v-if="gameJoined" :gameId="gameId" @setSocket="setSocket" />
        <JoinGame v-else @joinedGame="joinedGame" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import BattleMap from './components/BattleMap.vue';
import JoinGame from './components/JoinGame.vue';

import { Socket } from 'socket.io-client';

export default Vue.extend({
    name: 'App',
    components: {
        BattleMap,
        JoinGame,
    },
    data() {
        return {
            gameJoined: false,
            gameId: '',
            socket: undefined as Socket | undefined,
        };
    },
    methods: {
        joinedGame(gameId: string) {
            this.gameId = gameId;
            this.gameJoined = true;
        },
        setSocket(socket: Socket) {
            this.socket = socket;
        },
        disconnectSocket() {
            if (this.socket) {
                this.socket.disconnect();
            }
        },
        goBack() {
            this.gameJoined = false;
            this.disconnectSocket();
        },
    },
});
</script>

<style>
html,
body {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

#app {
    font-family: 'Ubuntu', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    width: 100%;
}

.fullHeight {
    height: 100%;
}

.back-button {
    position: absolute;
    top: 29px;
    left: 0;
    z-index: 1000;
    padding: 0.25rem 0.5rem;
    background-color: #1b1b1b;
    color: #eee;
    font-size: 14px;
    border-radius: 0 0 6px 0;
    font-size: 14px;
}

.back-button:hover {
    cursor: pointer;
    background-color: var(--bs-danger);
}
</style>
