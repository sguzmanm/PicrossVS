import React from 'react'
import './Cell.scss'
import PropTypes from 'prop-types'

const Cell = props => {
  const uncoverCell = isDiscover => {
    if (isDiscover && props.curCell === 0) {
      if (props.goal === 1) {
        props.uncoverCell(props.i, props.j, 1)
      } else {
        props.uncoverCell(props.i, props.j, -1)
      }
    } else if (!isDiscover) {
      if (props.curCell === 0) {
        props.uncoverCell(props.i, props.j, 2)
      } else if (props.curCell === 2) {
        props.uncoverCell(props.i, props.j, 0)
      }
    }
  }

  const handleClick = e => {
    if (props.state === 1) return
    if (e.type === 'click') {
      uncoverCell(true)
    } else if (e.type === 'contextmenu') {
      e.preventDefault()
      uncoverCell(false)
    }
  }

  const extraClassName = () => {
    if (props.state === 1 && props.curCell === 1) {
      return 'cell--finished'
    }
    let className = 'cell--undefined'
    switch (props.curCell) {
      case 1:
        className = 'cell--correct'
        break
      case 2:
        className = 'cell--flagged'
        break
      case -1:
        className = 'cell--incorrect'
        break
    }
    return className
  }
  return (
    <div
      className={`cell ${extraClassName()}`}
      onClick={handleClick}
      onContextMenu={handleClick}
    ></div>
  )
}

Cell.propTypes = {
  i: PropTypes.number,
  j: PropTypes.number,
  goal: PropTypes.number,
  uncoverCell: PropTypes.func.isRequired,
  curCell: PropTypes.number,
  state: PropTypes.number.isRequired,
}

export default Cell
