<template>
    <div class="week">
        <select v-if="signedIn" @change="onWeekSelection" style="display: block;">
            <option v-for="week in weekPicker" :value="week.value">
                {{week.text}}
            </option>
        </select>

         <div v-for="(game, index) in games" :key="game.date" class="schedule" :data-game="index">
             
            <div class="row schedule">
                <div>{{game.favoriteTeamName}} must win by {{game.spread}}</div>
                <div>{{game.date}} @ {{game.time}} <span v-if="game.channel">on {{game.channel}}</span></div>
               
                
                <div :data-team="game.away"  class="col s4 team">
                       <img class="team-logo" :src="_getLogoRef(game.awayTeamName)">  
                </div> 
                <div class="col s4">
                    <div class="row picks">
                        
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
                </div>
                <div class="col s4 team">
                     <img class="team-logo" :src="_getLogoRef(game.homeTeamName)">  
                </div>
            </div>
            
        </div>  
             <button @click="dothing">create schedule</button>   
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
        console.log(`week: ${this.$route.params.week}`);
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
        getHydratedWeek: function (weekKey) {
            
            console.log('HYDRATING FOR WEEK: ' + weekKey)
            let _weekRefKey = 'schedule/week' + weekKey;
            console.log('trying to get week.. ' + _weekRefKey)
            let schedule = db.ref(_weekRefKey);
            let teams = db.ref('teams');
            let _games = [];

            schedule.once('value', snap => {
                let week = snap.toJSON();
                
                this.getUserPromise.then(userKey => {
                    let _userPicksRefKey = 'picks/' + userKey + '/week' + weekKey;
                    console.log('user ref pick key: ' + _userPicksRefKey)
                    this.userPicksRef = db.ref(_userPicksRefKey);
                    this.userPicksRef.on('value', picksSnap => {
                        let allWeekPicks = picksSnap.toJSON();
                        console.log(allWeekPicks);

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
                console.log('why not working.. ' + this.$route.params.week)
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
        dothing: function () {
            utils.setPicks();
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
        border-bottom: 1px solid rgba(100,100,100, .6);
        height: 150px;
        margin-top: 20px;
        text-align: center;
    }
    .schedule .col {
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
</style>
