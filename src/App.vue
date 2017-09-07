<template>
  <div id="app">
    
    <router-link to="/">Home</router-link>
    <router-link to="/players">Players</router-link>
    <router-link to="/week">Week</router-link>
    <router-link to="/score">Score</router-link>

    <!-- <sign-in></sign-in> -->

    <router-view></router-view>
  </div>

  
</template>

<script>
  import {db} from './firebase';
  // import SignIn from './components/SignIn.vue'

  export default {
    name: 'app'
    // components: { SignIn }
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
