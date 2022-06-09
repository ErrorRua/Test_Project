let gameData = {
    level: [{
        maxRow:2,
        maxColumn:2,
        map:[1,0.2,0.2,0.6]
    },{
        maxRow:2,
        maxColumn:3,
        map:[0.2,0.6,0.2,0.2, 0.6,0.2]
    },{
        maxRow:2,
        maxColumn:3,
        map: [0.2,0.2,0.6,0.6,0.6,0.2]
    },{
        maxRow:3,
        maxColumn:3,
        map: [0.6,0.2,0.2,0,0.6,0.2,0.6,0.2,0.6]
    }],
    firstGame: localStorage.getItem("firstGame"),
    unlockedLevel: localStorage.getItem('unlockedLevel') || 1,
    actionStack: []
}