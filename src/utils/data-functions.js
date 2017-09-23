import { db } from '../firebase';
import { teams } from '../database/teams';
import { users } from '../database/users';
import { week1 } from '../database/schedule/week1';
import { week3 } from '../database/schedule/week3';
import { week4 } from '../database/schedule/week4';
import { week5 } from '../database/schedule/week5';
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
    createSchedule: function () {
        db.ref('schedule/week1').set({
            1: {
                date: 'Thursday, September 7',
                time: '8:30 PM',
                channel: 'NBC',
                home: 'Patriots',
                away: 'Chiefs'
            },
            2: {
                date: 'Sunday, September 10',
                time: '1:00 PM',
                channel: 'CBS',
                home: 'Bills',
                away: 'Jets'
            }
        });
    },
    
    setTeams: function () {
        db.ref('teams').set(teams);
    },
    setUsers: function () {
        db.ref('users').set(users);
    },
    setWeek: function () {
        db.ref('schedule/week3').set(week3);
        // db.ref('schedule/week4').set(week4);
    },
    //!!!!!!!!!CAREFUL!!!!!!!!!!!
    // this will wipe out all picks, ONLY FOR ALL WEEK SETUP
    //!!!!!!!!!CAREFUL!!!!!!!!!!!
    setPicks: function () {   
        let allPicks = {};
        for (var y = 0; y < 5; y++) {
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
        Object.keys(week5).forEach(function (gameKey) {
            Object.keys(teams).forEach(function (teamKey) {
                console.log(`if ${teams[teamKey].name.toLowerCase()} in `)
                if (teams[teamKey].name.toLowerCase().indexOf(week5[gameKey].homeName.toLowerCase()) > -1) {
                    week5[gameKey].home = parseInt(teamKey);
                } else if (teams[teamKey].name.toLowerCase().indexOf(week5[gameKey].awayName.toLowerCase()) > -1) {
                    week5[gameKey].away = parseInt(teamKey);
                }
            });
        });
        db.ref('schedule/week5').set(week5)
        console.log(week5);
    }
}
