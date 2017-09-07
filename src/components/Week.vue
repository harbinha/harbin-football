<template>
    <div class="week">
        
        <div v-for="game in schedule" :key="game.date" class="schedule">
            <div class="row schedule">
                 <div class="col s5 team">
                     <img @click="pickTeam" :data-team="game.away" class="team-logo" :src="'/static/team-logos/' + game.away.toLowerCase() + '.svg'">
                </div> 
                <div class="col s2">
                    <p>@</p>
                </div>
                <div class="col s5 team">
                    <img @click="pickTeam" :data-team="game.home" class="team-logo" :src="'/static/team-logos/' + game.home.toLowerCase() + '.svg'">
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
        pickTeam: function (e) {
            let el = e.currentTarget;
            el.classList.add('selected');
            console.log('picking team..' + el.dataset.team);
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
