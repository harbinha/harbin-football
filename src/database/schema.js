const schema = {
    users: {
        1: {
            name: 'hunter harbin',
            email: 'harbinhajmu@gmail.com',
            scores: {
                spread: 0,
                straight: 0
            }
        },
        2: {
            name: 'lauren stearns',
            email: 'stearnslh@gmail.com',
            scores: {
                spread: 0,
                straight: 0
            }
        }
    },
    picks: {
        1: { //maps to users/1 (hunter)
            week1: {
                1: { //maps to schedule/week1/1 game
                    spread: 14,
                    straight: 8
                },
                2: { //maps to schedule/week1/2 game
                    spread: 1,
                    straight: 25
                }
            }
        },
        2: { //maps to users/2 (lauren)
            week1: {
                1: { //maps to schedule/week1/1 game
                    spread: 8,
                    straight: 14
                },
                2: { //maps to schedule/week1/2 game
                    spread: 1,
                    straight: 1
                }
            }
        }
    },
    schedule: {
        week1: {
            1: {
                home: 3, //maps to teams/3 (patriots)
                away: 26, //maps to team/26 (chiefs)
                spread: 9, // teams/3 must win by 9 points
                favorite: 3, // maps to team/3
                time: "8:30 PM",
                date: "Thursday, September 7",
                channel: "NBC",
                winner: null
            },
            2: {
                home: 0,
                away: 0,
                spread: 0,
                favorite: 0,
                time: "",
                date: "",
                channel: "",
                winner: null
            }
        }
    },
    teams: {
        1:  { name: 'Buffalo Bills',        record: { win: 0, loss: 0, tie: 0 } },
        2:  { name: 'Miami Dolphins',       record: { win: 0, loss: 0, tie: 0 } },
        3:  { name: 'New England Patriots', record: { win: 0, loss: 0, tie: 0 } },
        4:  { name: 'New York Jets',        record: { win: 0, loss: 0, tie: 0 } },
        5:  { name: 'Dallas Cowboys',       record: { win: 0, loss: 0, tie: 0 } },
        6:  { name: 'New York Giants',      record: { win: 0, loss: 0, tie: 0 } },
        7:  { name: 'Philadelphia Eagles',  record: { win: 0, loss: 0, tie: 0 } },
        8:  { name: 'Washington Redskins',  record: { win: 0, loss: 0, tie: 0 } },
        9:  { name: 'Baltimore Ravens',     record: { win: 0, loss: 0, tie: 0 } },
        10: { name: 'Cincinnati Bengals',   record: { win: 0, loss: 0, tie: 0 } },
        11: { name: 'Cleveland Browns',     record: { win: 0, loss: 0, tie: 0 } },
        12: { name: 'Pittsburgh Steelers',  record: { win: 0, loss: 0, tie: 0 } },
        13: { name: 'Chicago Bears',        record: { win: 0, loss: 0, tie: 0 } },
        14: { name: 'Detroit Lions',        record: { win: 0, loss: 0, tie: 0 } },
        15: { name: 'Green Bay Packers',    record: { win: 0, loss: 0, tie: 0 } },
        16: { name: 'Minnesota Vikings',    record: { win: 0, loss: 0, tie: 0 } },
        17: { name: 'Houston Texans',       record: { win: 0, loss: 0, tie: 0 } },
        18: { name: 'Indianapolis Colts',   record: { win: 0, loss: 0, tie: 0 } },
        19: { name: 'Jacksonville Jaguars', record: { win: 0, loss: 0, tie: 0 } },
        20: { name: 'Tennessee Titans',     record: { win: 0, loss: 0, tie: 0 } },
        21: { name: 'Atlanta Falcons',      record: { win: 0, loss: 0, tie: 0 } },
        22: { name: 'Carolina Panthers',    record: { win: 0, loss: 0, tie: 0 } },
        23: { name: 'New Orleans Saints',   record: { win: 0, loss: 0, tie: 0 } },
        24: { name: 'Tampa Bay Buccaneers', record: { win: 0, loss: 0, tie: 0 } },
        25: { name: 'Denver Broncos',       record: { win: 0, loss: 0, tie: 0 } },
        26: { name: 'Kansas City Chiefs',   record: { win: 0, loss: 0, tie: 0 } },
        27: { name: 'Los Angeles Chargers', record: { win: 0, loss: 0, tie: 0 } },
        28: { name: 'Oakland Raiders ',     record: { win: 0, loss: 0, tie: 0 } },
        29: { name: 'Arizona Cardinals',    record: { win: 0, loss: 0, tie: 0 } },
        30: { name: 'Los Angeles Rams',     record: { win: 0, loss: 0, tie: 0 } },
        31: { name: 'San Francisco 49ers',  record: { win: 0, loss: 0, tie: 0 } },
        32: { name: 'Seattle Seahawks',     record: { win: 0, loss: 0, tie: 0 } },
    }
}