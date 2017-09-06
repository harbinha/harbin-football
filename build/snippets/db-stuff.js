export const dbStuff = {
    createPools: function () {
        db.ref('pools/family').set({
            members: {
                hunter: { score: 0 },
                mom: { score: 0 },
                dad: { score: 0 },
                andrew: { score: 0 },
                lauren: { score: 0 },
                rachel: { score: 0 }
            }
        });
    },
    updatePlayer: function (id, name, pool={family:true}) {
        db.ref(`players/${id}`).set({
            name: name,
            pool: pool
        });
        console.log(`updated ${name}`);
    }
}
