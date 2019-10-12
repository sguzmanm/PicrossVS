import React from "react";
import { PropTypes } from "prop-types";
import "./GamePreview.scss";

// Game preview component
const GamePreview = props => {
  console.log("ID", props.currentGameId);
  // Vars and constants setup
  let game = props.game;
  let occuppiedRows = game.numWaitedUsers === 4 ? 1 : 2;
  let occuppiedCols = game.numWaitedUsers === 1 ? 2 : 1;
  let board =
    game.players && game.players.length > 0 ? game.players[0].board : undefined;

  const rows = 2;
  const cols = game.numWaitedUsers === 3 ? 3 : 2;
  const playersLength = game.players ? game.players.length : 0;

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      props.onClick()
    }
  }

  // Squares for the preview
  let squares = [];
  for (let i = 0; i < game.numWaitedUsers; i++) {
    squares.push(
      <div
        key={i}
        className={`game-preview__item 
          ${i < playersLength ? "game-preview__item--color" + i : ""}`}
        style={{
          gridRow: `span ${occuppiedRows}`,
          gridColumn: `span ${occuppiedCols}`,
          height: `${3 * occuppiedRows}rem`
        }}></div>
    );
  }
  return (
    <div className='game-preview'>
      {/* Label with the sizeo f the board. ? if the size is unknown*/}
      <div className='game-preview__label'>
        {board && board.rows ? board.rows.length : ""}
      </div>
      {/* Board grid with active players*/}
      <div tabIndex="0"
        onClick={() => props.onClick()}
        onKeyPress={handleKeyPress}
        className={`game-preview__grid ${
          props.currentGameId === game._id ? "game-preview__grid--selected" : ""
          }`}
        style={{
          gridTemplateRows: `repeat( ${rows},1fr)`,
          gridTemplateColumns: `repeat(${cols},1fr)`
        }}> {squares}  </div>
    </div>
  );
};

export default GamePreview;

GamePreview.propTypes = {
  game: PropTypes.object,
  currentGameId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onClick: PropTypes.func
};
