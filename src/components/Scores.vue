<template>
  <div class="score">
    <!-- <h1>scoreee</h1> -->
    <table>
        <thead>
          <tr>
              <th>{{user.displayName}}</th>
              <th>total spread</th>
              <th>total straight</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>week 1</td>
            <td>20</td>
            <td>5</td>
          </tr>
          <tr>
            <td>week 2</td>
            <td>10</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
      <button @click="updateScores">update scores</button>
  </div>
</template>

<script>
import firebase from 'firebase';
import { db } from '../firebase';
import { utils } from '../utils/data-functions';
import { ScoreUpdater } from '../utils/score-updater';

export default {
    name: 'score',
    firebase () {
        return {
        }
    },
    data () {
        return {
            user: {}
        }
    },
    created () {
        firebase.auth().onAuthStateChanged(this.onAuthChange);
    },
    methods:  {
          updateScores: function () {
            console.log('udating score..')
            ScoreUpdater.updateScores();
        },
        onAuthChange: function (user) {
            if (user) {
                this.user = user;
                this.signedIn = true;
                console.log('user signed in');
                console.log(user)
            } else {
                this.signedIn = false;
                console.log('user signed in');
            }
        },
        getCurrentWeek: function () {
            return new Promise((resolve, reject) => {
                db.ref('/current/week').once('value', snap => {
                    resolve(snap.toJSON());
                });
            });
        }
    }

   

    
}
</script>

<style scoped>
</style>
