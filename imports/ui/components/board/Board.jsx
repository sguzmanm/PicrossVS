import React from "react";
import "./Board.scss";
import PropTypes from "prop-types";
import CellHint from "./cellHint/CellHint.jsx";
import CellGrid from "./cellGrid/CellGrid.jsx";
const Board = props => {
  let boardStyle = {
    gridTemplateColumns: `repeat(${props.board.columns.length + 1},3rem)`,
    gridTemplateRows: `4rem repeat(${props.board.rows.length},3rem)`
  };
  return (
    <div className='board__container'>
      <h2 className='board__name'>{props.board.name}</h2>
      <div className='board' style={boardStyle}>
        <div></div>
        {props.board.columns.map((row, i) => {
          return (
            <CellHint
              i={i}
              hint={props.board.columns[i]}
              key={i}
              isCol={true}></CellHint>
          );
        })}
        {props.board.rows.map((row, i) => {
          return (
            <CellHint
              i={i}
              hint={props.board.rows[i]}
              key={i}
              isCol={false}></CellHint>
          );
        })}
        <CellGrid
          board={props.board}
          uncoverCell={props.uncoverCell}
          curCells={props.curCells}></CellGrid>
      </div>
    </div>
  );
};

Board.propTypes = {
  board: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rows: PropTypes.arrayOf(PropTypes.string).isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    goal: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
  }).isRequired,
  uncoverCell: PropTypes.func.isRequired,
  curCells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
};

export default Board;
