<template>
  <div id="app">
    <router-link to="/">Home</router-link>
    <router-link to="/players">Players</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  import {db} from './firebase';

  export default {name: 'app'};
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
