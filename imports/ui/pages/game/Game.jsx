import React from "react";
import GameContainer from "../../components/game/game/Game.jsx";

const Game = props => {
  console.log("GAME PAGE PROPS", props);
  return <GameContainer {...props} />;
};

export default Game;
