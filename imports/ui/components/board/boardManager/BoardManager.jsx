import React, { useState } from 'react'
import './BoardManager.scss'
import Board from '../Board.jsx'
import PropTypes from 'prop-types'

//console.log(boards[2].goal.reduce((prev,cur)=> prev+cur.reduce((prev2,cur2)=>prev2+cur2,0),0))

const BoardManager = props => {
  const originalBoard = [
    props.board.curCells.map(function(arr) {
      return arr.slice()
    }),
  ]

  const [board, setBoard] = useState(...originalBoard)
  const [numCorrect, setNumCorrect] = useState(0)
  const [boardState, setBoardState] = useState(0)

  const finishBoard=()=>{
    const boardTemp=[...originalBoard][0];
    for(const i in board){
      for(const j in board[i]){
        if(board[i][j]===1){
          boardTemp[i][j]=1
        }
        else{
          boardTemp[i][j]=2
        }
      }
    }
    setBoard(boardTemp)
  }

  const uncoverCell = (i, j, changeToState) => {
    boardTemp=[...board]
    boardTemp[i][j] = changeToState
    setBoard(boardTemp)
    if (changeToState === 1) {
      setNumCorrect(numCorrect + 1)
      if (numCorrect+1 === props.board.numCorrect) {
        setBoardState(1)
        finishBoard()
      }
    }
  }

  const resetBoard = () => {
    setBoard(...originalBoard)
    setNumCorrect(0)
    setBoardState(0)
  }

  console.log(board)

  return (
    <div className="tutorial">
      <h1 className="tutorial__title">Tutorial</h1>

      <Board
        board={props.board}
        uncoverCell={(i, j, correct) => uncoverCell(i, j, correct)}
        curCells={board}
        state={boardState}
      ></Board>

      {props.isTutorial ? (
        <button className="tutorial__button" onClick={resetBoard}>
          Reset board
        </button>
      ) : null}
    </div>
  )
}

BoardManager.propTypes = {
  board: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rows: PropTypes.arrayOf(PropTypes.string).isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    goal: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  }).isRequired,
  isTutorial: PropTypes.bool.isRequired,
}

export default BoardManager
