<template>
  <div id="app">
    <router-link to="/">Home</router-link>
    <router-link to="/players">Players</router-link>
    {{ players }}
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueFire from 'vuefire'
  import Firebase from 'firebase'
  import {config} from './firebaseConfig'

  Vue.use(VueFire)
  let db = Firebase.initializeApp(config).database();
  let playersRef = db.ref('players')
  export default {
    name: 'app',
    firebase () {
      return {
        players: playersRef
      };
    }
  };
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
