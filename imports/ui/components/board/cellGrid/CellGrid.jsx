import React from "react";
import "./CellGrid.scss";
import PropTypes from "prop-types";
import Cell from "../cell/Cell.jsx";
const CellGrid = props => {
  let boardStyle = {
    gridTemplateColumns: `repeat(${props.board.columns.length},3rem)`,
    gridTemplateRows: `repeat(${props.board.rows.length},3rem)`
  };

  let containerStyle = {
    width: `calc(${props.board.columns.length * 3}rem + ${(props.board.columns
      .length -
      1) *
      2}px)`,
    height: `calc(${props.board.rows.length * 3}rem + ${(props.board.rows
      .length -
      1) *
      2}px)`
  };
  return (
    <div className='cellGrid__container' style={containerStyle}>
      <div className='cellGrid' style={boardStyle}>
        {props.board.rows.map((row, i) => {
          return props.board.columns.map((column, j) => {
            return (
              <Cell
                i={i}
                j={j}
                state={props.state}
                goal={props.board.goal[i][j]}
                key={i + "" + j}
                uncoverCell={props.uncoverCell}
                curCell={props.curCells[i][j]}></Cell>
            );
          });
        })}
      </div>
    </div>
  );
};

CellGrid.propTypes = {
  board: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rows: PropTypes.arrayOf(PropTypes.string).isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    goal: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
  }).isRequired,
  uncoverCell: PropTypes.func.isRequired,
  curCells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  state: PropTypes.number.isRequired
};

export default CellGrid;
