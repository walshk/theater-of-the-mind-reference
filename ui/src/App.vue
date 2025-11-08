<template>
    <div id="app">
        <BattleMap
            v-if="gameJoined"
            :gameId="gameId"
            :playerId="playerId"
            :enterAsDm="enterAsDm"
            @setSocket="setSocket"
            @goBack="goBack"
        />
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
            playerId: '',
            enterAsDm: false,
            socket: undefined as Socket | undefined,
        };
    },
    methods: {
        joinedGame(gameId: string, playerId: string, enterAsDm: boolean) {
            this.gameId = gameId;
            this.playerId = playerId;
            this.gameJoined = true;
            this.enterAsDm = enterAsDm;
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
    font-family: 'Lato', sans-serif;
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
</style>
