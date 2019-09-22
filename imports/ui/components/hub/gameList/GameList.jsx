import React from "react";
import "./GameList.scss";

import GamePreview from "./gamePreview/GamePreview.jsx";

const GameList = props => {
  let games = null;
  if (props.activeGames) {
    games = props.activeGames.map(el => {
      return (
        <GamePreview
          key={el._id}
          game={el}
          currentGameId={props.currentGameId}
          onClick={() => props.changeCurrentGameId(el._id)}
        />
      );
    });
  }

  return <div className='game-list'>{games}</div>;
};

export default GameList;
