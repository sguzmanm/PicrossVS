/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import "./Tutorial.scss";
import Board from "../../components/board/Board.jsx";
import boards from "../../../util/boards.json";

const Tutorial = () => {
  const [board1, setBoard1] = useState([...boards[0].curCells]);
  const [board2, setBoard2] = useState([...boards[1].curCells]);
  const [board3, setBoard3] = useState([...boards[2].curCells]);

  const uncoverCell = (i, j, changeToState, board) => {
    let boardTemp = null;
    let setBoard = null;
    switch (board) {
    case 1:
      boardTemp = [...board1];
      setBoard = setBoard1;
      break;
    case 2:
      boardTemp = [...board2];
      setBoard = setBoard2;
      break;
    case 3:
      boardTemp = [...board3];
      setBoard = setBoard3;
      break;
    }
    boardTemp[i][j] = changeToState;
    setBoard(boardTemp);
  };

  const resetBoard = board => {
    let setBoard;
    let originalBoard;
    switch (board) {
    case 1:
      setBoard = setBoard1;
      originalBoard = boards[0].curCells;
      break;
    case 2:
      setBoard = setBoard2;
      originalBoard = boards[1].curCells;
      break;
    case 3:
      setBoard = setBoard3;
      originalBoard = boards[2].curCells;
      break;
    }
    console.log(originalBoard);
    setBoard(originalBoard);
  };

  return (
    <div className='tutorial'>
      <h1 className='tutorial__title'>Tutorial</h1>
      <p className='tutorial__item'>
        The objective of Picross is to complete a figure using the clues located
        at the ends of the board to be solved. Try it! You'll see how much fun
        it is
      </p>
      <h2>First board: Tshirt</h2>
      <ol className='tutorial__list'>
        <li className='tutorial__listItem'>
          Look for example at the lower board, the first column indicates that
          there are 2 consecutive squares in it, the second column indicates
          that there are 5 consecutive squares in it, and so on. These mentioned
          squares have a number of indefinite spaces both before and after.
        </li>
        <li className='tutorial__listItem'>
          The first row, on the other hand, indicates that there are 2
          consecutive cells, and then 2 other consecutive cells, separated by an
          indefinite number of spaces.
        </li>
        <li className='tutorial__listItem'>
          To check a square make left click in the mouse, try for example to
          check all the row that has a 5 in front (Since there are 5 squares
          checked in a row and the board is 5x5, this means that all the squares
          of this row must be checked).
        </li>
        <li className='tutorial__listItem'>
          Now you do the same thing with columns with a 5 in front of them.
        </li>
        <li className='tutorial__listItem'>
          If you did the previous steps you will see that there are 2 boxes
          checked with an unchecked box in the middle for the rows below. Since
          there are 3 consecutive squares as indicated by the row, this half
          square must also be checked. Check it!
        </li>
        <li className='tutorial__listItem'>
          In the top row, note that we have the same situation. However, if you
          indicated this box as checked there would be 3 boxes in a row, which
          does not correspond to what the row indicates. So if you right click
          on this box you can check it as a box that is certainly not checked.
          Do it!
        </li>
        <li className='tutorial__listItem'>
          Now you can see that in the ends of this first row, you have the right
          amount of spaces so that when you check them you form the 2 groups of
          the 2 consecutive squares.
        </li>
        <li className='tutorial__listItem'>And voila! solved board</li>
      </ol>
      <Board
        board={boards[0]}
        uncoverCell={(i, j, correct) => uncoverCell(i, j, correct, 1)}
        curCells={board1}></Board>

      <button className='tutorial__button' onClick={() => resetBoard(1)}>
        Reset board
      </button>

      <Board
        board={boards[1]}
        uncoverCell={(i, j, correct) => uncoverCell(i, j, correct, 2)}
        curCells={board2}></Board>

      <button className='tutorial__button' onClick={() => resetBoard(2)}>
        Reset board
      </button>

      <Board
        board={boards[2]}
        uncoverCell={(i, j, correct) => uncoverCell(i, j, correct, 3)}
        curCells={board3}></Board>

      <button className='tutorial__button' onClick={() => resetBoard(3)}>
        Reset board
      </button>
    </div>
  );
};

export default Tutorial;
