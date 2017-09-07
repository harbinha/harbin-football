<template>
  <div class="home">
    <sign-in></sign-in>
    <h3>{{ msg }}</h3>
  </div>
</template>

<script>
import SignIn from './SignIn.vue'

export default {
  name: 'home',
  components: { SignIn },
  data () {
    return {
      msg: 'Welcome to Harbin Football Pool 2017'
    }
  }
}
</script>

<style scoped>

</style>
