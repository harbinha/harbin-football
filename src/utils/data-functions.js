import { db } from '../firebase';
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
    picks: function () {
        db.ref('picks/week1/spread').set({
            1: {
                hunter: 'Chiefs',
                mom: 'Chiefs',
                andrew: 'Chiefs',
                dad: 'Patriots',
                lauren: 'Patriots'
                
            }
        });
        db.ref('picks/week1/straight').set({
            1: {
                hunter: 'Patriots',
                mom: 'Patriots',
                andrew: 'Patriots',
                dad: 'Patriots',
                lauren: 'Patriots'
            }
        });
    }

}
