import React, { useState, useRef } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import "./Game.scss";

import Loading from "./loading/Loading.jsx";
import Timer from "./timer/Timer.jsx";
import Modal from './modal/Modal.jsx'
import BoardManager from "../board/boardManager/BoardManager.jsx";

import { Redirect } from "react-router-dom";

// Games collections and topics
import { gamesTopic } from "../../../util/topics";
import { Games } from "../../../api/games";
import { FINISHED, CANCELLED } from "../../../util/gameStates";

const Game = props => {
  const boardRef = useRef(null);

  const [show, setShow] = useState(false);
  const updateGame = (playerIndex, board, score) => {
    let currentGame = props.currentGame;
    Meteor.call("games.update", currentGame._id, playerIndex, board, score);
  };

  const finishGame = (playerIndex, isDropout) => {
    let currentGame = props.currentGame;
    Meteor.call("games.finish", currentGame._id, playerIndex, isDropout);
    if (isDropout) goToHub();
  };

  const goToHub = () => {
    props.history.push("/hub");
  };

  const getCurrentPlayer = () => {
    let game = props.currentGame;

    if (!game) return -1;

    if (game.players.length !== game.numWaitedUsers) return -1;

    return props.currentGame.players.findIndex(
      el => el.user.username === props.currentUser.username
    );
  };

  // Loading
  let playerIndex = getCurrentPlayer();
  if (playerIndex === -1) {
    return (
      <Loading
        currentGame={props.currentGame}
        currentUser={props.currentUser}
        history={props.history}
      />
    );
  }

  // Board setup
  let currentPlayer = props.currentGame.players[playerIndex];
  if (currentPlayer.state === CANCELLED) {
    return <Redirect path='/hub' />;
  }

  // Other current attributes
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

  if (props.currentGame.state === CANCELLED) goToHub();

  // Map user scores
  const userScores = playerList.map((el, index) => {
    if (isFinished || index !== playerIndex) {
      player = el.user;
      score = el.curScore;
      return (
        <div className='game__scores' key={index}>
          <p
            className={`game__text game__text--color${
              el.state === FINISHED ? "Final" : index
              }`}>
            {index + 1}. {player.username}
          </p>

          <p
            className={`game__text game__text--color${
              el.state === FINISHED ? "Final" : index
              }`}>
            {score ? score : 0}
          </p>
        </div>
      );
    }

    return null;
  });



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
  const restoreFocus = () => {
    if (boardRef.current) {
      boardRef.current.focus()
    }
  }

  // Render board
  return (
    <div className='game'>
      {show ? <Modal closeModal={() => { setShow(false); restoreFocus() }} finishGame={() => finishGame(playerIndex, true)}></Modal> : null}

      <div className='row' ref={boardRef}>
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
          {!isFinished ? (
            <div className='game__text'>
              <Timer size={currentBoard.rows.length}></Timer>
            </div>
          ) : null}
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
