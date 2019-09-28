import React, { useState, useEffect } from "react";
import "./BoardManager.scss";
import Board from "../Board.jsx";
import PropTypes from "prop-types";

const BoardManager = props => {
  // Vars setup
  const originalBoard = [
    props.board.curCells.map(function(arr) {
      return arr.slice();
    })
  ];

  const [board, setBoard] = useState(...originalBoard);
  const [numCorrect, setNumCorrect] = useState(0);
  const [boardState, setBoardState] = useState(0);
  const [score, setScore] = useState(500);

  useEffect(() => {
    newBoard();
  }, board.goal);

  const finishBoard = () => {
    const boardTemp = [...originalBoard][0];
    for (const i in board) {
      for (const j in board[i]) {
        if (board[i][j] === 1) {
          boardTemp[i][j] = 1;
        } else {
          boardTemp[i][j] = 2;
        }
      }
    }
    setBoard(boardTemp);
  };

  const uncoverCell = (i, j, changeToState) => {
    let boardTemp = [...board];
    boardTemp[i][j] = changeToState;
    setBoard(boardTemp);
    if (changeToState === 1) {
      setScore(score + 100);
      setNumCorrect(numCorrect + 1);
      if (numCorrect + 1 === props.board.numCorrect) {
        setBoardState(1);
        finishBoard();
      }
    } else if (changeToState === -1) {
      setScore(score - 400);
    }

    if (props.updateGame) {
      props.updateGame(board, score);
    }
  };

  const resetBoard = () => {
    setBoard(...originalBoard);
    setNumCorrect(0);
    setBoardState(0);
  };

  const newBoard = () => {
    // FIxME: Add a current user numCorrect att to avoid this loop
    let numCorrect = 0;
    let goal = props.board.goal;

    let complete = true;
    let tempVal = 0;

    for (let i = 0; i < goal.length; i++) {
      for (let j = 0; j < goal[0].length; j++) {
        console.log(goal[i][j], board[i][j], goal[i][j] === board[i][j]);
        tempVal = board[i][j];
        if (tempVal < 0) tempVal = 0;
        if (goal[i][j] !== tempVal) {
          complete = false;
          continue;
        }
        if (goal[i][j] === 1) {
          numCorrect++;
        }
      }
    }

    console.log(numCorrect, complete);
    setNumCorrect(numCorrect);
    setBoardState(complete ? 1 : 0);
  };

  return (
    <div className='boardManager'>
      <Board
        board={props.board}
        uncoverCell={(i, j, correct) => uncoverCell(i, j, correct)}
        curCells={board}
        state={boardState}></Board>

      <p className='boardManager__score'>{score}</p>

      {props.isTutorial ? (
        <button className='boardManager__button' onClick={resetBoard}>
          Reset board
        </button>
      ) : null}
    </div>
  );
};

BoardManager.propTypes = {
  board: PropTypes.shape({
    name: PropTypes.string.isRequired,
    curCells: PropTypes.array,
    numCorrect: PropTypes.number,
    rows: PropTypes.arrayOf(PropTypes.string).isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    goal: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
  }).isRequired,
  isTutorial: PropTypes.bool.isRequired
};

export default BoardManager;
