import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
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
    console.log("UPDATE");
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

  let currentPlayer = props.currentGame.players[playerIndex];
  let currentBoard = currentPlayer.board;
  let currentScore = currentPlayer.curScore;

  let player = {};
  let score = 0;
  let userScores = props.currentGame.players.map((el, index) => {
    if (index !== playerIndex) {
      player = el.user;
      score = el.curScore;
      return (
        <div className='game__scores' key={index}>
          <p className={`game__text game__text--color${index}`}>
            {player.username}
          </p>

          <p className={`game__text game__text--color${index}`}>
            {score ? score : 500}
          </p>
        </div>
      );
    }

    return null;
  });

  return (
    <div className='game'>
      <BoardManager
        curScore={currentScore}
        board={currentBoard}
        isTutorial={false}
        updateGame={(board, score) =>
          updateGame(playerIndex, board, score)
        }></BoardManager>

      <div>
        <p className='game__text'>
          {/* TODO: Add game timer*/}
          HERE SHOULD BE THE GAME TIMER
        </p>
        {userScores}
      </div>
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

Game.propTypes = {
  currentGame: PropTypes.object,
  currentUser: PropTypes.object,
  history: PropTypes.any
};

export default GameContainer;
