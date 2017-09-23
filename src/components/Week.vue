<template>
    <div class="week">
        <select v-if="signedIn" @change="onWeekSelection" style="display: block;">
            <option v-for="(week, index) in weekPicker" :value="week.value" :selected="$route.params.week-1 === index">
                {{week.text}}
            </option>
        </select>

         <div v-for="(game, index) in games" :key="game.date"  :data-game="index">
             
            <div class="row schedule">
                <span v-if="game.winner">
                    <div>{{game.awayTeamName}}: {{game.awayFinal}}</div>
                    <div>{{game.homeTeamName}}: {{game.homeFinal}}</div>
                    <div>{{game.favoriteTeamName}} had to win by {{game.spread}}</div>
                </span>
                <span v-else>
                    <div v-if="game.favoriteTeamName != 'TBD'">{{game.favoriteTeamName}} must win by {{game.spread}}</div>
                    <div>{{game.date}} <span v-if="game.time">@ {{game.time}}</span> <span v-if="game.channel">on {{game.channel}}</span></div>
                </span>
                <div v-bind:class="[game.winner === game.away ? 'winner' : game.winner === game.home ? 'loser' : '', 'col s4 team']">
                    <img class="team-logo" :src="_getLogoRef(game.awayTeamName)">  
                </div> 
                <div class="col s4">
                    <div v-if="!game.homeFinal" class="row picks">
                        <div class="spread types">
                            <input class="inline" type="checkbox" :id="`awaySpread${index}`" :checked="`${game.pickedSpread === game.away ? 'checked' : ''}`" />
                            <label @click="pickTeamSpread(game, game.away, index)" :data-team="game.away" class="away inline" :for="`awaySpread${index}`"></label>

                            <div class="vs-text">spread</div>

                            <input class="inline" type="checkbox" :id="`homeSpread${index}`" :checked="`${game.pickedSpread === game.home ? 'checked' : ''}`"/>
                            <label @click="pickTeamSpread(game, game.home, index)" :data-team="game.home" class="home inline" :for="`homeSpread${index}`"></label>
                        </div>

                        <div class="straight types">
                            <input class="inline" type="checkbox" :id="`awayStraight${index}`" :checked="`${game.pickedStraight === game.away ? 'checked' : ''}`"/>
                            <label @click="pickTeamStraight(game, game.away, index)" :data-team="game.away" class="away inline" :for="`awayStraight${index}`"></label>
                            
                            <div class="vs-text">straight</div>
                            
                            <input class="inline" type="checkbox" :id="`homeStraight${index}`" :checked="`${game.pickedStraight === game.home ? 'checked' : ''}`"/>
                            <label @click="pickTeamStraight(game, game.home, index)" :data-team="game.home" class="home inline":for="`homeStraight${index}`"></label>
                        </div>
                    </div>
                    <div v-else>
                        <div class="picks">
                            <div class="pick-results row"> 
                                <i v-if="game.pickedSpread === game.away && pickedCorrectSpread(game, 'away')" class="material-icons away-result winner-check">check</i>
                                <i v-else-if="game.pickedSpread === game.away" class="material-icons away-result loser-x">close</i> 
                                <span class="col s12">spread</span>
                                <i v-if="game.pickedSpread === game.home && pickedCorrectSpread(game, 'home')" class="material-icons home-result winner-check">check</i> 
                                <i v-else-if="game.pickedSpread === game.home" class="material-icons home-result loser-x">close</i> 
                            </div>
                            <div class="pick-results row">
                                <i v-if="game.pickedStraight === game.away && game.pickedStraight === game.winner" class="material-icons away-result winner-check">check</i>
                                <i v-else-if="game.pickedStraight === game.away" class="material-icons away-result loser-x">close</i> 
                                <span class="col s12">straight</span>
                                <i v-if="game.pickedStraight === game.home && game.pickedStraight === game.winner" class="material-icons home-result winner-check">check</i>
                                <i v-else-if="game.pickedStraight === game.home" class="material-icons home-result loser-x">close</i>                             
                            </div>
                        </div>
                    </div>
                </div>
                <div v-bind:class="[game.winner === game.home ? 'winner' : game.winner === game.away ? 'loser' : '', 'col s4 team']">
                    <img class="team-logo" :src="_getLogoRef(game.homeTeamName)">  
                </div>
            </div>
        </div>  
        <!-- <button @click="dothing">create schedule</button>     -->
    </div>
</template>
<script>
import firebase from 'firebase';
import { db } from '../firebase';
import { utils } from '../utils/data-functions';

export default {
    name: 'week',
    watch: {
        '$route' (to, from) {
            if (to.params.week) this.games = this.getHydratedWeek(to.params.week);
        }
    },
    created () {  
        firebase.auth().onAuthStateChanged(this.onAuthChange);
    },
    data () {
        let weekPicker = [];
        for (let i = 0; i < 16; i++) {
            weekPicker.push({
                text: `week ${i+1}`,
                value: i+1
            });   
        }
        return {
            games: [],
            weekPicker: weekPicker,
            signedIn: false
        };
    },
    methods: {
        pickedCorrectSpread: function (game, side) {
            if (side === 'away') {
                return game.winner === game.pickedSpread && game.awayFinal >= (game.homeFinal + game.spread)
            } else {
                return game.winner === game.pickedSpread && game.homeFinal >= (game.awayFinal + game.spread)
            }
        },
        getHydratedWeek: function (weekKey) {
            let _weekRefKey = 'schedule/week' + weekKey;
            let schedule = db.ref(_weekRefKey);
            let teams = db.ref('teams');
            let _games = [];

            schedule.once('value', snap => {
                let week = snap.toJSON();
                
                this.getUserPromise.then(userKey => {
                    let _userPicksRefKey = 'picks/' + userKey + '/week' + weekKey;
                    this.userPicksRef = db.ref(_userPicksRefKey);
                    this.userPicksRef.on('value', picksSnap => {
                        let allWeekPicks = picksSnap.toJSON();

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
            return _games;
        },
        onWeekSelection: function (event) {
            this.$router.push(`/week/${event.currentTarget.value}`)
        },
        onAuthChange: function (user) {
            if (user) {
                this.signedIn = true;
                this.getUserPromise = this.getUserRef(user);
                if (this.$route.params.week) this.games = this.getHydratedWeek(this.$route.params.week)
            } else {
                this.signedIn = false;
                this.getUserPromise = this.games = null;
                this.$router.push('/week')
            }
        },
        getUserRef: function (user) {
            return new Promise((resolve, reject) => {
                let userRef = db.ref('users').orderByChild('email').equalTo(user.email).on('value', snap => {
                    this.userKey = Object.keys(snap.toJSON());
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
        _getLogoRef: function(team) {
            let t = team.split(' ');
            return `/static/team-logos/${t[t.length-1].toLowerCase()}.svg`;
        },

    //todo: remove this hacky shit
        dothing: function () {
            utils.setWeek();
        },
    }
};
</script>
<style scoped>
    .team {
        display: flex;
        justify-content: center;
        position: relative;
    }
    .schedule {
        border-bottom: 1px solid rgba(100,100,100, .6);
        height: auto;
        margin-top: 20px;
        text-align: center;
    }
    .schedule.col {
        max-height: 100px; 
        text-align: center;
    }
    .team-logo {
        max-width: 100%;
        height: 100px;
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
    .winner {
        border-bottom: 1px solid green;
    }
    .away-result.loser-x,
    .away-result.winner-check {
        left: 0;
    }
    .home-result.loser-x,
    .home-result.winner-check {
        right: 0;
    }
    .winner-check {
        color: green;
        position: absolute;
    }
    .loser {
        border-bottom: 1px solid red;
    }
    .loser-x {
        color: red;
        position: absolute;
    }
    .pick-results {
        position: relative;
        margin-bottom: 5px;
    }
</style>
