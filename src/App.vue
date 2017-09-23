<template>
  <div id="app">
    <nav>
      <div class="indigo lighten-2 nav-wrapper">
        <a href="#" class="left brand-logo">Harbin Football Pool</a>
        <ul id="nav-mobile" class="right">
          <li id="signOut" @click="signOut" class="sign-out">
            <a>sign out</a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- <div v-if="signedIn" class="row router-links">
      <div class="col s12">
        <span class="col s4">
          <router-link to="/players">players</router-link>
        </span>
        <span class="col s4">
          <router-link to="/week/1">week</router-link>
        </span>
        <span class="col s4">
          <router-link to="/score">score</router-link>
        </span>
      </div>
    </div> -->
    <div id="signIn" class="hidden"></div>

    <div id="signedInUser" class="signed-in-user hidden">
      <div class="card horizontal">
        <div v-if="photoURL" class="card-image">
          <img :src="photoURL">
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <p class="welcome-message">Welcome {{ displayName }}</p>
          </div>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { db } from './firebase';
import firebase from 'firebase';
import firebaseui from 'firebaseui';

export default {
  name: 'app',
  data() {
    return {
      displayName: '',
      photoURL: '',
      signedIn: false
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(this.onAuthChange);
  },
  methods: {
    onAuthChange: function(user) {
      if (user) {
        this.signedIn = true;
        this.displayName = user.displayName;
        this.photoURL = user.photoURL;
        document.getElementById('signIn').classList.add('hidden');
        document.getElementById('signedInUser').classList.remove('hidden');
        document.getElementById('signOut').classList.remove('hidden');
        if (!this.$route.params.week) this.$router.push('/week/1')
      } else {
        this.signedIn = false;
        document.getElementById('signIn').classList.remove('hidden');
        document.getElementById('signOut').classList.add('hidden');
        document.getElementById('signedInUser').classList.add('hidden');
        if (!this.config) this.config = this.getAuthConfig();
        if (!this.ui) this.ui = new firebaseui.auth.AuthUI(firebase.auth());
        this.ui.start('#signIn', this.config);
      }
    },
    signOut: function() {
      this.signedIn = false;
      firebase.auth().signOut();
    },
    getAuthConfig: function() {
      return {
        signInSuccessUrl: '/#/week/1', //TODO: this should get current week
        signInOptions: [
          {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            scopes: ['https://www.googleapis.com/auth/plus.login']
          },
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInFlow: 'popup'
      }
    }
  }
};
</script>

<style>
.signed-in-user {
  margin: 0 auto;
  width: 250px;
}

.hidden {
  display: none;
}

.sign-out {
  cursor: pointer;
}

.router-links {
  text-align: center;
  margin-top: 20px;
}

.welcome-message {
  text-align: center;
}
</style>
