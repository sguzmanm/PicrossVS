/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import "./Tutorial.scss";
import Board from "../../components/board/Board.jsx";
import boards from "../../../util/boards.json";

const Tutorial = () => {
  const originalBoards = [
    boards[0].curCells.map(function(arr) {
      return arr.slice();
    }),
    boards[1].curCells.map(function(arr) {
      return arr.slice();
    }),
    boards[2].curCells.map(function(arr) {
      return arr.slice();
    })
  ];

  const [board1, setBoard1] = useState([...originalBoards[0]]);
  const [board2, setBoard2] = useState([...originalBoards[1]]);
  const [board3, setBoard3] = useState([...originalBoards[2]]);

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
      originalBoard = [...originalBoards[0]];
      break;
    case 2:
      setBoard = setBoard2;
      originalBoard = [...originalBoards[1]];
      break;
    case 3:
      setBoard = setBoard3;
      originalBoard = [...originalBoards[2]];
      break;
    }
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

      <h2>Second board: Chicken</h2>
      <ol className='tutorial__list'>
        <li className='tutorial__listItem'>
          No rows or columns with a 5, lets try a different strategy: You see
          that if we count spaces between numbers as a 1, the column with a 1-3
          will sum up to 5 (1+1+3=5)
        </li>
        <li className='tutorial__listItem'>
          What we can do now is check the first cell in that column, leave a
          space, and check the last 3. Finally, flag the space with a right
          click so that you don't try to check it by mistake
        </li>
        <li className='tutorial__listItem'>
          From here, there are multiple things that you can make: for example,
          you see that besides the flag space there are 2 groups with 2
          consecutive cells each, just as the row says!. You can check those
        </li>
        <li className='tutorial__listItem'>
          Another posibility is that you flag the spaces at the last row.
          Because the row says there is only one cell that needs to be checked,
          we know there are no more cells to check in this row. Therefore, you
          can flag the rest of the row. This is the same for the last column
        </li>
        <li className='tutorial__listItem'>
          You could also check the cells in the middle the 3rd and 4th row. Why?
          Because these rows require 4 consecutive cells. This means that no
          matter how you try, the cells in the middle will always need to be
          checked
        </li>
        <li className='tutorial__listItem'>
          Now that you have done those steps, you can see that the last free
          cells (the one that are not flagged) in the first column can be
          checked. Because that way we complete the 4 that is needed. Note that
          the same is true for the first row
        </li>
        <li className='tutorial__listItem'>
          You can reset the board with the button below and try to solve it in
          different ways, practice makes perfect, specially in Picross
        </li>
      </ol>

      <Board
        board={boards[1]}
        uncoverCell={(i, j, correct) => uncoverCell(i, j, correct, 2)}
        curCells={board2}></Board>

      <button className='tutorial__button' onClick={() => resetBoard(2)}>
        Reset board
      </button>

      <h2>Third board: Butterfly</h2>
      <ol className='tutorial__list'>
        <li className='tutorial__listItem'>
          This board is way bigger now! And yes, we will leave it all to you.
          But we will also give you some final tips
        </li>
        <li className='tutorial__listItem'>
          Try to find the biggest number in the rows or columns, if the number
          is bigger than the half of the size of the board, then you know that
          at least the cells in the middle need to be checked
        </li>
        <li className='tutorial__listItem'>
          The previous statement is also true for rows or columns which have
          many numbers spread. For example a hint with 2-3-3 is as valuable as a
          hint with a 10 (both add up to 10 if you count the spaces between
          numbers as 1)
        </li>
        <li className='tutorial__listItem'>
          Don't forget to flag (Right click): Flagging prevents you from making
          mistakes and also leave less space to check other rows or columns,
          this will make easier finding where to check the next cell
        </li>
      </ol>

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
