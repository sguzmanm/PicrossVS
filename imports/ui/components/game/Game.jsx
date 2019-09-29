import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import "./Game.scss";

import Loading from "./loading/Loading.jsx";
import BoardManager from "../board/boardManager/BoardManager.jsx";

// Games collections and topics
import { gamesTopic } from "../../../util/topics";
import { Games } from "../../../api/games";
import { FINISHED } from "../../../util/gameStates";

const isLoading = game => {
  if (!game) return true;
  if (game.players.length !== game.numWaitedUsers) return true;
  return false;
};

const Game = props => {
  const [show, setShow] = useState(false);

  const updateGame = (playerIndex, board, score) => {
    let currentGame = props.currentGame;
    Meteor.call("games.update", currentGame._id, playerIndex, board, score);
  };

  const finishGame = (playerIndex, isDropout) => {
    let currentGame = props.currentGame;
    Meteor.call("games.finish", currentGame._id, playerIndex, isDropout);
  };

  const goToHub = () => {
    props.history.push("/hub");
  };

  // Loading
  if (isLoading(props.currentGame)) {
    return (
      <Loading
        currentGame={props.currentGame}
        currentUser={props.currentUser}
        history={props.history}
      />
    );
  }

  // Board setup
  let playerIndex = props.currentGame.players.findIndex(
    el => el.user.username === props.currentUser.username
  );

  let currentPlayer = props.currentGame.players[playerIndex];
  let currentBoard = currentPlayer.board;
  let currentScore = currentPlayer.curScore;

  let player = {};
  let score = 0;

  let playerList = props.currentGame.players;

  const isFinished = props.currentGame.state === FINISHED;
  if (isFinished) {
    playerList = playerList.sort((a, b) => {
      if (a.curScore < b.curScore) return 1;
      if (a.curScore > b.curScore) return -1;
      return 0;
    });
  }

  // Map user scores
  const userScores = playerList.map((el, index) => {
    if (isFinished || index !== playerIndex) {
      player = el.user;
      score = el.curScore;
      return (
        <div className='game__scores' key={index}>
          <p
            className={`game__text game__text--color${
              el.finished ? "Final" : index
            }`}>
            {index + 1}. {player.username}
          </p>

          <p
            className={`game__text game__text--color${
              el.finished ? "Final" : index
            }`}>
            {score ? score : 500}
          </p>
        </div>
      );
    }

    return null;
  });

  const modal = (
    <div className='modal'>
      <div className='modal__backdrop' onClick={() => setShow(false)}></div>
      <div className='modal__body'>
        <h4 className='modal__title'>Don´t be a dropout</h4>
        <img
          className='modal__close'
          alt='Close icon'
          src={"/icons/close.svg"}
        />
        <div className='modal__content'>
          Are you sure you wanna leave the game? You´ll be punished by losing
          2000 points :(
        </div>
        <div className='modal__footer'>
          <button
            className='game__button game__button--cancel'
            onClick={() => setShow(false)}>
            NO
          </button>
          <button
            className='game__button game__button--ok'
            onClick={() => {
              setShow(false);
              finishGame(playerIndex, true);
            }}>
            YES
          </button>
        </div>
      </div>
    </div>
  );

  let button = (
    <div className='row'>
      <button
        className='game__button game__button--cancel'
        onClick={() => setShow(true)}>
        DROP OUT
      </button>
    </div>
  );

  if (isFinished) {
    button = (
      <div className='row'>
        <button
          className='game__button game__button--ok'
          onClick={() => goToHub()}>
          GO TO HUB
        </button>
      </div>
    );
  }

  // Render board
  return (
    <div className='game'>
      {show ? modal : null}

      <div className='row'>
        {/* Show board only when they are playing*/}
        {isFinished ? null : (
          <BoardManager
            curScore={currentScore}
            board={currentBoard}
            isTutorial={false}
            updateGame={(board, score) => updateGame(playerIndex, board, score)}
            finishGame={isDropout =>
              finishGame(playerIndex, isDropout)
            }></BoardManager>
        )}

        <div>
          {isFinished ? <h2 className='game__text'>GAME OVER</h2> : null}
          <p className='game__text'>
            {/* TODO: Add game timer*/}
            HERE SHOULD BE THE GAME TIMER
          </p>
          {isFinished ? <h2 className='game__text'>RANKING LIST </h2> : null}
          {userScores}

          {button}
        </div>
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
