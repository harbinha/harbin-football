<template>
    <div class="week">
        
        <div v-for="game in schedule" :key="game.date" class="schedule">
            <div class="row schedule">
                <div @click="pickTeam(game.away)" class="col s5 team">{{game.away}}</div>
                <div class="col s2">@</div>
                <div @click="pickTeam(game.home)" class="col s5 team">{{game.home}}</div>
            </div>
        </div>
        <button @click="dothing">create schedule</button> 
        <img src="../assets/team-logos/bills.svg">
        
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
            utils.picks();
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
</style>
