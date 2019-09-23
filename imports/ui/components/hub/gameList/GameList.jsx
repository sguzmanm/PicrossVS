import React from "react";
import "./GameList.scss";

import GamePreview from "../gamePreview/GamePreview.jsx";

const GameList = props => {
  let games = null;

  if (props.activeGames) {
    games = props.activeGames.map(el => {
      return (
        <GamePreview
          key={el._id}
          game={el}
          currentGameId={props.addGame ? -1 : props.currentGameId}
          onClick={() => {
            props.changeCurrentGameId(el._id);
            props.finishAddGame();
          }}
        />
      );
    });
  }

  console.log("ADD GAME", props.addGame);
  return (
    <div className='game-list'>
      <div className='game-list__add'>
        {/* Label for add button*/}
        <div className='game-list__add__label'>New</div>
        {/* Board grid*/}
        <button
          className={`game-list__add__button ${
            props.addGame ? "game-list__add__button--selected" : ""
          }`}
          onClick={props.setAddGame}>
          <img src={"/icons/add.svg"} alt='Add icon' />
        </button>
      </div>

      {games}
    </div>
  );
};

export default GameList;
