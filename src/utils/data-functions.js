import { db } from '../firebase';
import { teams } from '../database/teams';
import { users } from '../database/users';
import { week1 } from '../database/schedule/week1';
import { week3 } from '../database/schedule/week3';
import { week4 } from '../database/schedule/week4';
import { week5 } from '../database/schedule/week5';
import { week6 } from '../database/schedule/week6';
import { week7 } from '../database/schedule/week7';
import { picks } from '../database/picks/picks';

export const utils = {
    createPools: function () {
        db.ref('pools/family').set({
            members: {
                hunter: { score: 0 },
                mom: { score: 0 },
                dad: { score: 0 },
                andrach: { score: 0 },
                lauren: { score: 0 }
            }
        });
    },
    updatePlayer: function (id, name, pool={family:true}) {
        db.ref(`players/${id}`).set({
            name: name,
            pool: pool
        });
        console.log(`updated ${name}`);
    },
    
    setTeams: function () {
        db.ref('teams').set(teams);
    },
    setUsers: function () {
        db.ref('users').set(users);
    },
    setWeek: function () {
        // db.ref('schedule/week7').set(week7);
        // db.ref('schedule/week7').set(week7);
    },
    //!!!!!!!!!CAREFUL!!!!!!!!!!!
    // this will wipe out all picks, ONLY FOR ALL WEEK SETUP
    //!!!!!!!!!CAREFUL!!!!!!!!!!!
    setPicks: function () {   
        let allPicks = {};
        for (var y = 5; y < 16; y++) {
            allPicks[y+1] = this.getUserPicks()
        }
        console.log(allPicks);
        // db.ref('picks').set(allPicks);
    },
    getUserPicks: function () {
        let userPicks = {};
        for (var i = 0; i < 17; i++) {
            let key = `week${i+1}`;
            userPicks[key] = {}
            for (var x = 0; x < 16; x++) {
                userPicks[key][parseInt(x+1)] = {
                    spread: 0,
                    straight: 0
                }
            }
        }
        return userPicks;
    },

    teamNameToKey: function () {
        Object.keys(week7).forEach(function (gameKey) {
            Object.keys(teams).forEach(function (teamKey) {
                if (teams[teamKey].name.toLowerCase().indexOf(week7[gameKey].homeName.toLowerCase()) > -1) {
                    week7[gameKey].home = parseInt(teamKey);
                } else if (teams[teamKey].name.toLowerCase().indexOf(week7[gameKey].awayName.toLowerCase()) > -1) {
                    week7[gameKey].away = parseInt(teamKey);
                }

                if (teams[teamKey].name.toLowerCase().indexOf(week7[gameKey].favoriteName.toLowerCase()) > -1) {
                    week7[gameKey].favorite = parseInt(teamKey);
                }
                week7[gameKey].winner = 0;
                // if (teams[teamKey].name.toLowerCase().indexOf(week7[gameKey].winnerName.toLowerCase()) > -1) {
                //     week7[gameKey].winner = parseInt(teamKey);
                // }
            });
        });
        db.ref('schedule/week7').set(week7)
        console.log(week7);
    }
}
