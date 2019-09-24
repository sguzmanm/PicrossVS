import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import Loading from "../loading/Loading.jsx";

// Games collections and topics
import { activeGamesTopic } from "../../../../util/topics";
import { Games } from "../../../../api/games";

const isLoading = game => {
  if (!game) return true;
  if (game.players.length !== game.numWaitedUsers) return true;
  return false;
};

const Game = props => {
  console.log(props.currentGame, props.currentUser);
  if (isLoading(props.currentGame))
    return (
      <Loading
        currentGame={props.currentGame}
        currentUser={props.currentUser}
        history={props.history}
      />
    );
  else return <h1>Here should be the board</h1>;
};

// Export with props from backend
export default GameContainer = withTracker(props => {
  let gameId = props.match.params.id;
  console.log("History", props.history);
  console.log("Game id", gameId);
  Meteor.subscribe(activeGamesTopic);
  return {
    currentGame: Games.find({ _id: gameId }).fetch()[0]
  };
})(Game);
