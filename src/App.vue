<template>
  <div id="app">
     <!-- <div hidden> -->
      <a id="signOut" @click="signOut" class="waves-effect waves-light btn hidden">Sign Out</a>
    <!-- </div>  -->

    <router-link to="/">Home</router-link>
    <router-link to="/players">Players</router-link>
    <router-link to="/week">Week</router-link>
    <router-link to="/score">Score</router-link>

    <div id="signIn" class="hidden"></div>

    <div id="signedInUser" class="signed-in-user hidden">
      <div class="card horizontal">
        <div v-if="photoURL" class="card-image">
          <img :src="photoURL">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <p>Welcome {{ displayName }}</p>
          </div>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { db } from '../firebase';
import firebase from 'firebase';
import firebaseui from 'firebaseui';

export default {
  name: 'app',
  data() {
    return {
      displayName: '',
      photoURL: ''
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(this.onAuthChange);
  },
  methods: {
    handleSignedInUser: function(user) {
      this.displayName = user.displayName;
      this.photoURL = user.photoURL;
      return true;
    },
    onAuthChange: function(user) {
      if (user) {
        console.log(user)
        this.displayName = user.displayName;
        this.photoURL = user.photoURL;
        document.getElementById('signIn').classList.add('hidden');
        document.getElementById('signedInUser').classList.remove('hidden');
        document.getElementById('signOut').classList.remove('hidden');
      } else {
        document.getElementById('signIn').classList.remove('hidden');
        document.getElementById('signOut').classList.add('hidden');
        document.getElementById('signedInUser').classList.add('hidden');
        if (!this.config) this.config = this.getAuthConfig();
        if (!this.ui) this.ui = new firebaseui.auth.AuthUI(firebase.auth());
        this.ui.start('#signIn', this.config);
      }
    },
    signOut: function () {
      firebase.auth().signOut();
    },
    getAuthConfig: function() {
      return {
        signInSuccessUrl: '/#/week',
        signInOptions: [
          {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            scopes: ['https://www.googleapis.com/auth/plus.login']
          },
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInFlow: 'popup',
        callbacks: {
          'signInSuccess': (user, credential, redirectUrl) => {
            this.handleSignedInUser(user);
            return true;
          }
        }
      }
    }
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

.signed-in-user {
  margin: 0 auto;
  width: 250px;
}
.hidden {
  display: none;
}
</style>
