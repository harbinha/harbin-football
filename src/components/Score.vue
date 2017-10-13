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
        firebase.auth().onAuthStateChanged(this.onAuthChange);
    },
    onAuthChange: function (user) {
        if (user) {
            this.signedIn = true;
            this.getUserPromise = this.getUserRef(user);
            if (this.$route.params.week) this.games = this.getHydratedWeek(this.$route.params.week)
        } else {
            this.signedIn = false;
            this.getUserPromise = this.games = null;
            this.$router.push('/week')
        }
    }
}
</script>

<style scoped>
</style>
