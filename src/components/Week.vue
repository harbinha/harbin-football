<template>
    <div class="week">
         <div v-for="(game, index) in games" :key="game.date" class="schedule" :data-game="index">
            <div class="row schedule">
                <div  :data-team="game.away"  class="col s4 team">
                       <img class="team-logo" :src="_getLogoRef(game.away)">  
                </div> 
                <div class="col s4">
                    <div class="row picks">
                        <div class="spread types">
                            <input class="inline" :name="`groupSpread${index}`" type="radio" :id="`awaySpread${index}`" />
                            <label @click="pickTeamSpread(game.away, index)" :data-team="game.away" class="away inline" :for="`awaySpread${index}`"></label>
                            
                            <div class="vs-text">spread</div>
                            
                            <input :name="`groupSpread${index}`" type="radio" :id="`homeSpread${index}`" />
                            <label @click="pickTeamSpread(game.home, index)" :data-team="game.home" class="home inline" :for="`homeSpread${index}`"></label>
                        </div>

                        <div class="straight types">
                            <input class="inline" :name="`groupStraight${index}`" type="radio" :id="`awayStraight${index}`" />
                            <label @click="pickTeamStraight(game.away, index)" :data-team="game.away" class="away inline" :for="`awayStraight${index}`"></label>
                            
                            <div class="vs-text">straight</div>
                            
                            <input class="inline" :name="`groupStraight${index}`" type="radio" :id="`homeStraight${index}`" />
                            <label @click="pickTeamStraight(game.home, index)" :data-team="game.home" class="home inline":for="`homeStraight${index}`"></label>
                        </div>
                    </div>
                </div>
                <div class="col s4 team">
                     <img class="team-logo" :src="_getLogoRef(game.home)">  
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
    created () {
        firebase.auth().onAuthStateChanged(this.onAuthChange);
    },
    data () {
        let schedule = db.ref('schedule/week1');
        let teams = db.ref('teams');
        let _games = [];

        schedule.once('value', snap => {
            let week = snap.toJSON();

            teams.once('value', teamSnap => {
                let teamJSON = teamSnap.toJSON();
                
                Object.keys(week).forEach(game => {
                    let homeKey = week[game].home;
                    let awayKey = week[game].away;
                    let fullGame = Object.assign({}, week[game]);
                    fullGame.home = teamJSON[week[game].home].name;
                    fullGame.away = teamJSON[week[game].away].name;
                    fullGame.favorite = teamJSON[week[game].favorite].name;
                    
                    _games.push(fullGame);
                });
            });
        });
        return {
            games: _games
        };
    },
    methods: {
        onAuthChange: function (user) {
            console.log(user);
            if (user) {
                this.getUserPromise = this.getUserRef(user).then(userKey => {
                    this.setCurrentPicks(userKey);
                });
            }
        },
        setCurrentPicks: function (key) {
            this.userPicksRef.on('value', picksSnap => {
                let allWeekPicks = picksSnap.toJSON();
                Object.keys(allWeekPicks).forEach(gameIndex => {
                    console.log(allWeekPicks[gameIndex]);

                    // spreads
                    if (allWeekPicks[gameIndex].spread !== 0) {
                        document.getElementById('')
                    }
                });
            });
        },
        getUserRef: function (user) {
            return new Promise((resolve, reject) => {
                let userRef = db.ref('users').orderByChild('email').equalTo(user.email).on('value', snap => {
                    this.userKey = Object.keys(snap.toJSON());
                    this.userPicksRef = db.ref(`picks/${this.userKey}/week1`);
                    console.log(`logged in user: ${this.userKey}`);
                    // get the users picks
                    resolve(this.userKey);
                });
            });
        },
        pickTeamSpread: function (team, index) {
            console.log('picking.. ' + team)
            this.setPick(team, index, 'spread')
        },
        pickTeamStraight: function (team, index) {
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
