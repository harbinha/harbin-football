<template>
  <div class="players">
    <div v-for="player in players" :key="player.name">
        {{ player.name }}
        <!-- TODO: p.name a thing?  -->
        <span class="pool" v-for="p in player.pool" :key="p.name">{{ p }}</span>
    </div>
  </div>
</template>
<script>
import { db } from '../firebase';

export default {
    name: 'players',
    firebase () {
        return {
            players: db.ref('players')
        }
    }
}
</script>
<style scoped>
    .players {
        color: coral;
    }
    .pool {
        margin: 0 10px;
    }
</style>