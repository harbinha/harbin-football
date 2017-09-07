<template>
    <div id="sign-in">
        <div v-if="signedIn" id="signedInUser">
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
    </div>
</template>
<script>
import { db } from '../firebase';
import firebase from 'firebase';
import firebaseui from 'firebaseui';

export default {
    name: 'sign-in',
    data () {
        return {
            displayName: '',
            photoURL: '',
            signedIn: false
        }
    },
    created () {
        this.config = this.getAuthConfig();
        firebase.auth().onAuthStateChanged(this.onAuthChange);

        this.ui = new firebaseui.auth.AuthUI(firebase.auth());
        this.ui.start('#sign-in', this.config);
    },
    methods: {
        handleSignedInUser: function (user) {
            console.log(user);
            this.signedIn = true;
            this.displayName = user.displayName;
            this.photoURL = user.photoURL;
            return false;
        },
        onAuthChange: function (user) {
            if (user) {
                this.displayName = user.displayName;
                this.photoURL = user.photoURL;
            } else {
                this.signedIn = false;
                this.ui.start('#sign-in', this.config);
            }
        },
        getAuthConfig: function () {
            return {
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
                    }
                }
            }
        }
    }
};
</script>

<style scoped>
    #signedInUser {
        margin: 0 auto;
        width: 250px;
    }
</style>
