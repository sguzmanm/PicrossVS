import React from "react";

const GameList = props => {
  console.log(props.activeGames);
  let games = null;
  if (props.activeGames) {
    games = props.activeGames.map(el => {
      return (
        <div className='game-list__item'>
          <p>{el.numWaitedUsers}</p>
        </div>
      );
    });
  }

  console.log(games);
  return games;
};

export default GameList;
