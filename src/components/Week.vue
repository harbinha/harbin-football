<template>
    <div class="week">
        <select @change="onWeekSelection" style="display: block;">
            <option v-for="week in weekPicker" :value="week.value">
                {{week.text}}
            </option>
            <!-- <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option> -->
        </select>

         <div v-for="(game, index) in games" :key="game.date" class="schedule" :data-game="index">
            <div class="row schedule">
                <div :data-team="game.away"  class="col s4 team">
                       <img class="team-logo" :src="_getLogoRef(game.awayTeamName)">  
                </div> 
                <div class="col s4">
                    <div class="row picks">
                        <div class="spread types">
                            <input class="inline" type="checkbox" :id="`awaySpread${index}`" :checked="`${game.pickedSpread == game.away ? 'checked' : ''}`" />
                            <label @click="pickTeamSpread(game, game.away, index)" :data-team="game.away" class="away inline" :for="`awaySpread${index}`"></label>

                            <div class="vs-text">spread</div>

                            <input class="inline" type="checkbox" :id="`homeSpread${index}`" :checked="`${game.pickedSpread == game.home ? 'checked' : ''}`"/>
                            <label @click="pickTeamSpread(game, game.home, index)" :data-team="game.home" class="home inline" :for="`homeSpread${index}`"></label>
                        </div>

                        <div class="straight types">
                            <input class="inline" type="checkbox" :id="`awayStraight${index}`" :checked="`${game.pickedStraight == game.away ? 'checked' : ''}`"/>
                            <label @click="pickTeamStraight(game, game.away, index)" :data-team="game.away" class="away inline" :for="`awayStraight${index}`"></label>
                            
                            <div class="vs-text">straight</div>
                            
                            <input class="inline" type="checkbox" :id="`homeStraight${index}`" :checked="`${game.pickedStraight == game.home ? 'checked' : ''}`"/>
                            <label @click="pickTeamStraight(game, game.home, index)" :data-team="game.home" class="home inline":for="`homeStraight${index}`"></label>
                        </div>
                    </div>
                </div>
                <div class="col s4 team">
                     <img class="team-logo" :src="_getLogoRef(game.homeTeamName)">  
                </div>
            </div>
        </div>  
           <!-- <button @click="dothing">create schedule</button>  -->
    </div>
</template>
<script>
import firebase from 'firebase';
import { db } from '../firebase';
import { utils } from '../utils/data-functions';

export default {
    name: 'week',
    created () {  
        console.log(`week: ${this.$route.params.week}`);
        firebase.auth().onAuthStateChanged(this.onAuthChange);
    },
    data () {
        
        let schedule = db.ref('schedule/week1');
        let teams = db.ref('teams');
        let _games = [];

        schedule.once('value', snap => {
            let week = snap.toJSON();
            
            this.getUserPromise.then(userKey => {
                this.userPicksRef.on('value', picksSnap => {
                    let allWeekPicks = picksSnap.toJSON();
                    // console.log(allWeekPicks);

                    teams.once('value', teamSnap => {
                        let teamJSON = teamSnap.toJSON();
                        for (let game in week) {
                            
                            let homeKey = week[game].home;
                            let awayKey = week[game].away;
                            let fullGame = Object.assign({}, week[game]);
                            fullGame.homeTeamName = teamJSON[week[game].home].name;
                            fullGame.awayTeamName = teamJSON[week[game].away].name;
                            fullGame.favoriteTeamName = teamJSON[week[game].favorite].name;

                            fullGame.pickedSpread = allWeekPicks[game].spread;
                            fullGame.pickedStraight = allWeekPicks[game].straight;

                            _games.push(fullGame);
                        }
                    });
                });
            });
            
        });
        let weekPicker = [];
        for (let i = 0; i < 16; i++) {
            weekPicker.push({
                text: `week ${i+1}`,
                value: i+1
            });
        }
        return {
            games: _games,
            weekPicker: weekPicker
        };
    },
    methods: {
        onWeekSelection: function (event) {
            this.$router.push(`/week/${event.currentTarget.value}`)
        },
        onAuthChange: function (user) {
            console.log(user);
            if (user) {
                this.getUserPromise = this.getUserRef(user);
            }
        },
        getUserRef: function (user) {
            return new Promise((resolve, reject) => {
                let userRef = db.ref('users').orderByChild('email').equalTo(user.email).on('value', snap => {
                    this.userKey = Object.keys(snap.toJSON());
                    this.userPicksRef = db.ref(`picks/${this.userKey}/week1`);
                    resolve(this.userKey);
                });
            });
        },
        pickTeamSpread: function (game, team, index) {
            this.games[index].pickedSpread = team;
            this.setPick(team, index, 'spread')
        },
        pickTeamStraight: function (game, team, index) {
            this.games[index].pickedStraight = team;
            this.setPick(team, index, 'straight')
        },
        setPick: function (team, index, type) {
            this.getUserPromise.then(userKey => {
                this.userPicksRef.child(`${index+1}/${type}`).set(team);
            });
        },
        dothing: function () {
            // utils.setPicks();
        },
        _getLogoRef: function(team) {
            let t = team.split(' ');
            return `/static/team-logos/${t[t.length-1].toLowerCase()}.svg`;
        }
    }
};
</script>
<style scoped>
    .team {
        cursor: pointer;
        justify-content: center;
        display: flex;
    }
    .schedule {
        height: 100px;
        margin-top: 20px;
    }
    .schedule .col {
        height: 100%;
        text-align: center;
    }
    .team-logo {
        width: 100%;
    }
    .selected {
        border: 1px solid blue;
    }
    [type="radio"]:not(:checked)+label {
        padding-left: 25px;
    }
    .types {
        display: flex;
        justify-content: center;
    }
    .picks {
        transform: translateY(50%);
    }
    .away {
        padding-left: 40px !important;
    }
    .home {
        margin-left: 14px !important;
    }
</style>
