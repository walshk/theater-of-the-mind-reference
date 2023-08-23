<template>
    <div class="marker-builder"></div>
</template>

<script lang="ts">
import Vue from 'vue';

import Marker from '@/models/Marker';

export default Vue.extend({
    name: 'MarkerBuilder',
});
</script>

<style scoped>
.marker-builder {
    height: 100%;
    width: 100%;
}
</style>
