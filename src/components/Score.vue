<template>
  <div class="score">
    <h1>scoreee</h1>
    {{ players }}
  </div>
</template>

<script>
import { db } from '../firebase';

export default {
    name: 'score',
    firebase () {
        return {
            players: db.ref('players')
        }
    },
    created () {
        console.log(`scores ${this.players}`)
    }
}
</script>

<style scoped>
</style>
