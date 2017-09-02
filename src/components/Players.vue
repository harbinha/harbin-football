<template>
  <div class="players">
    <div v-for="player in players" :key="player.name">
        {{ player.name }}
    </div>
  </div>
</template>
<script>
import {db} from '../firebase';

export default {
    name: 'players',
    firebase () {
      return {
        players: db.ref('players')
      };
    }
}
</script>
<style scoped>
    .players {
        color: coral;
    }
</style>