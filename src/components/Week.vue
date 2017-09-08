<template>
    <div class="week">
         {{_games}}
        
        <div v-for="game in schedule" :key="game.date" class="schedule">
            <div class="row schedule">
                 <div class="col s5 team">
                     {{game.home}}
                      <!-- <img @click="pickTeam" :data-team="game.away" class="team-logo" :src="'/static/team-logos/' + game.away.toLowerCase() + '.svg'">  -->
                </div> 
                <div class="col s2">
                    <p>@</p>
                </div>
                <div class="col s5 team">
                    {{game.away}}
                    <!-- <img @click="pickTeam" :data-team="game.home" class="team-logo" :src="'/static/team-logos/' + game.home.toLowerCase() + '.svg'"> -->
                </div>
                
            </div>
        </div>
         <button @click="dothing">create schedule</button>  
        
        <!-- <div class="container">
            {{curWeek}}
        </div> -->
    </div>
</template>
<script>
import { db } from '../firebase';
import { utils } from '../utils/data-functions';

export default {
    name: 'week',
    data () {
        return {
            _games: []
        }
    },
    firebase () {
        this._games = [];
        let schedule = db.ref('schedule/week1'),
            teams = db.ref('teams');

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
                    
                    this._games.push(fullGame);
                    
                });
            });
            console.log(this._games);

        });
        
        return {
            schedule: schedule,
            curWeek: db.ref('current'),
            teams: teams
        }
    },
    methods: {
        pickTeam: function (e) {
            let el = e.currentTarget;
            el.classList.add('selected');
            console.log('picking team..' + el.dataset.team);
            console.log(this.curWeek[0]['.value'])
        },
        dothing: function () {
            // utils.setPicks();
            console.log('done');
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
</style>
