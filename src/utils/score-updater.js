import { db } from '../firebase';


export const ScoreUpdater = {
    getUsers: function () {
        return new Promise((resolve, reject) => {
            db.ref('users').once('value', snap => {
                let users = snap.toJSON();
                resolve(users);
            });
        });
    },

    updateScores: function () {
        let schedule = db.ref('schedule');

        schedule.once('value', snap => {
            let weeks = snap.toJSON(); // using weeks to get scores
            for (let i = 1; i <= 5; i++) { // loop over users
                let userKey = `users/${i}/scores`; // /spread or /straight
                console.log('create score at ' + userKey);
                let picksRef = `picks/${i}`
                db.ref(picksRef).once('value', pickSnap => {
                    let userPicks = pickSnap.toJSON(),
                        spreadScore = 0,
                        straightScore = 0;
    
                    // calculate totals
                    for (let x = 3; x <= Object.keys(weeks).length; x++) {
                        console.log('in week ' + x + ' for user ' + i);
                        let weekKey = `week${x}`,
                            week = weeks[weekKey],
                            picks = userPicks[weekKey];

                        if (week) {
                            // let spreadResult = this.spreadPicksCorrect(week, picks);
                            let straightResult = this.straightPicksCorrect(week, picks);
                        }
                    }
                });
            } 
        });
    },

    spreadPicksCorrect: function (week, picks) {
        for (let y = 0; y < Object.keys(week).length; y++) {
            console.log(week)
            console.log(picks);
            for (let p = 0; p < Object.keys(picks).length; p++) {
                
            }
        }
    },

    straightPicksCorrect: function (week, picks) {
        // console.log('get any straight picks right? ' + week)
        // console.log(week);
        let count = 0;
        for (let y = 0; y < Object.keys(week).length; y++) {
            if (picks[y]) {
                // console.log(`picked: ${picks[y].straight} ; winner: ${week[y].winner}`)
                if (picks[y].straight === week[y].winner) {
                    count++;
                }
            }
        }
        console.log(`GOT ${count} RIGHT`)
    }
};