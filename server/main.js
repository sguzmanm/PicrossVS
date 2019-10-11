import "/imports/api/boards";
import "/imports/api/games";
import { Games } from "/imports/api/games";
import { Users } from "/imports/api/users";
import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";
// Game states
import { ACTIVE, FINISHED } from "../imports/util/gameStates";

Meteor.startup(() => {
    WebApp.addHtmlAttributeHook(() => ({ lang: "en" }));
});

var query = Games.find({});
let init = true;
const updateScoresUnfinished = (game) => {
    game.players.forEach(player => {
        if (player.finished) return
        const curUser = Users.findOne({ _id: player.user._id });

        const score = Math.max(0, curUser.score + player.curScore)

        Users.update(curUser._id, { $set: { "score": score } });
    });
}


//ASYNC NECESSARY IN ORDER TO CLOSE GAME
const closeGame = async (id) => {
    const game = Games.findOne({ _id: id });
    if (game.state !== ACTIVE) return
    Games.update({ _id: id }, { $set: { state: FINISHED } })
    updateScoresUnfinished(game)
}

const addTimeoutToGame = (id, fields) => {
    if (fields.state !== ACTIVE) return
    const game = Games.findOne({ _id: id });
    const rowsLength = game.players[0].board.rows.length
    let timeout = 2
    switch (rowsLength) {
        case 10: timeout = 10; break;
        case 15: timeout = 20; break;
        case 20: timeout = 30; break;
    }
    setTimeout(() => closeGame(id, fields), timeout * 60 * 1000)
}

query.observeChanges({
    added: function (id, fields) {
        if (!init) {
            addTimeoutToGame(id, fields);
        }
    },
    changed: function (id, fields) {
        if (!init) {
            addTimeoutToGame(id, fields);
        }
    }
})
init = false;