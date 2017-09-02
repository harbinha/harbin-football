<template>
  <div class="players">
    <div v-for="player in players" :key="player.name">
        {{ player.name }}
    </div>
  </div>
</template>
<script>
export default {
    name: 'players',
    data () {
        return {
            players: [
                { name: 'Hunter' },
                { name: 'Mom'    },
                { name: 'Dad'    },
                { name: 'Andrew' },
                { name: 'Lauren?'},
                { name: 'Rachel?'},
            ]
        }
    }
}
</script>
<style scoped>
    .players {
        color: coral;
    }
</style>