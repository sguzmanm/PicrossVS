import React from "react";
import "./GamePreview.scss";

// Game preview component
const GamePreview = props => {
  // Vars and constants setup
  let game = props.game;
  let occuppiedRows = game.numWaitedUsers === 4 ? 1 : 2;
  let occuppiedCols = game.numWaitedUsers === 1 ? 2 : 1;
  const rows = 2;
  const cols = game.numWaitedUsers === 3 ? 3 : 2;
  const playersLength = game.players ? game.players.length : 0;

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
        }}
        onClick={() => props.onClick()}></div>
    );
  }

  return (
    <div className='game-preview'>
      {/* Label with the sizeo f the board. ? if the size is unknown*/}
      <div className='game-preview__label'>
        {game.board ? game.board.length : ""}
      </div>
      {/* Board grid with active players*/}
      <div
        className={`game-preview__grid ${
          props.currentGameId === game._id ? "game-preview__grid--selected" : ""
        }`}
        style={{
          gridTemplateRows: `repeat( ${rows},1fr)`,
          gridTemplateColumns: `repeat(${cols},1fr)`
        }}>
        {squares}
      </div>
    </div>
  );
};

export default GamePreview;
