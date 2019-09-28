import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import "./Game.scss";

import Loading from "./loading/Loading.jsx";
import BoardManager from "../board/boardManager/BoardManager.jsx";

// Games collections and topics
import { gamesTopic } from "../../../util/topics";
import { Games } from "../../../api/games";

const isLoading = game => {
  if (!game) return true;
  if (game.players.length !== game.numWaitedUsers) return true;
  return false;
};

const Game = props => {
  const updateGame = (playerIndex, board, score) => {
    let currentGame = props.currentGame;

    Meteor.call("games.update", currentGame._id, playerIndex, board, score);
  };

  if (isLoading(props.currentGame))
    return (
      <Loading
        currentGame={props.currentGame}
        currentUser={props.currentUser}
        history={props.history}
      />
    );

  let playerIndex = props.currentGame.players.findIndex(
    el => el.user.username === props.currentUser.username
  );

  let currentBoard = props.currentGame.players[playerIndex].board;

  let player = {};
  let score = 0;
  let userScores = props.currentGame.players.map((el, index) => {
    if (index !== playerIndex) {
      player = el.user;
      score = el.curScore;
      return (
        <p key={index}>
          {player.username} {score}
        </p>
      );
    }

    return null;
  });

  return (
    <div className='game'>
      <BoardManager
        board={currentBoard}
        isTutorial={false}
        updateGame={(board, score) =>
          updateGame(playerIndex, board, score)
        }></BoardManager>

      <div className='game__scores'>{userScores}</div>
    </div>
  );
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
