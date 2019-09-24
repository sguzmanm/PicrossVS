import React, { useState } from 'react'
import './Tutorial.scss'
import Board from '../../components/board/Board.jsx'
import boards from '../../../util/boards.json'

const Tutorial = () => {
  const [board1, setBoard1] = useState(boards[0].curCells)
  const [board2, setBoard2] = useState(boards[1].curCells)
  const [board3, setBoard3] = useState(boards[2].curCells)

  const uncoverCell = (i, j, changeToState, board) => {
    let boardTemp = null
    let setBoard = null
    switch (board) {
      case 1:
        boardTemp = [...board1]
        setBoard = setBoard1
        break
      case 2:
        boardTemp = [...board2]
        setBoard = setBoard2
        break
      case 3:
        boardTemp = [...board3]
        setBoard = setBoard3
        break
    }
    boardTemp[i][j] = changeToState
    setBoard(boardTemp)
  }

  return (
    <div className="tutorial">
      <h1 className="tutorial__title">Tutorial</h1>
      <Board
        board={boards[0]}
        uncoverCell={(i, j, correct) => uncoverCell(i, j, correct, 1)}
        curCells={board1}
      ></Board>

      <Board
        board={boards[1]}
        uncoverCell={(i, j, correct) => uncoverCell(i, j, correct, 2)}
        curCells={board2}
      ></Board>

      <Board
        board={boards[2]}
        uncoverCell={(i, j, correct) => uncoverCell(i, j, correct, 3)}
        curCells={board3}
      ></Board>
    </div>
  )
}

export default Tutorial
