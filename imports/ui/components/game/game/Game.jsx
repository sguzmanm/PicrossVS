import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import Loading from "../loading/Loading.jsx";

// Games collections and topics
import { gamesTopic } from "../../../../util/topics";
import { Games } from "../../../../api/games";

const isLoading = game => {
  if (!game) return true;
  if (game.players.length !== game.numWaitedUsers) return true;
  return false;
};

const Game = props => {
  console.log(props, props.currentGame, props.currentUser);
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
const GameContainer = withTracker(props => {
  let gameId = props.match.params.id;
  Meteor.subscribe(gamesTopic);
  return {
    currentGame: Games.find({ _id: gameId }).fetch()[0]
  };
})(Game);

export default GameContainer;
