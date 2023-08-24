<template>
    <div id="app"><BattleMap /></div>
</template>

<script lang="ts">
import Vue from 'vue';

import BattleMap from './components/BattleMap.vue';

export default Vue.extend({
    name: 'App',
    components: {
        BattleMap,
    },
});
</script>

<style>
html,
body {
    width: 100%;
    height: 100%;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
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
