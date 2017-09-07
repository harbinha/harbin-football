<template>
    <div class="week">
        
        <div v-for="game in schedule" :key="game.date" class="schedule">
            <div class="row schedule">
                 <div @click="pickTeam(game.away)" class="col s5 team">
                     <img class="team-logo" :src="'/static/team-logos/' + game.away.toLowerCase() + '.svg'">
                </div> 
                
                <div class="col s2">@</div>
                <div @click="pickTeam(game.home)" class="col s5 team">
                    <img class="team-logo" :src="'/static/team-logos/' + game.home.toLowerCase() + '.svg'">
                </div>
                
            </div>
        </div>
        <!-- <button @click="dothing">create schedule</button>  -->
        
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
    firebase () {
        return {
            schedule: db.ref('/schedule/week1'),
            curWeek: db.ref('/current')
        }
    },
    methods: {
        pickTeam: function (team) {
            console.log('picking team..' + team);
            console.log(this.curWeek[0]['.value'])
        },
        dothing: function () {
            // utils.picks();
            console.log('done');
        }
    }
};
</script>
<style scoped>
    .team {
        cursor: pointer;
    }
    .schedule {
        margin-top: 20px;
    }
    .team-logo {
        max-width: 100%;
    }
</style>
