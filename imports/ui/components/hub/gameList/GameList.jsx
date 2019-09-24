import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import './GameList.scss';

import GamePreview from '../gamePreview/GamePreview.jsx';

const GameList = props => {
  // Filter
  const [filterCriteria, setFilterCriteria] = useState('');

  const sizeOptions = ['All', 5, 10, 20].map(el => (
    <option key={el} value={el}>
      {el}
    </option>
  ));

  const filterActiveGames = games => {
    if (games === null) return;

    let tempGames = games;
    if (filterCriteria !== '')
      tempGames = games.filter(el => {
        return el.players[0].board.rows.length === parseInt(filterCriteria, 10);
      });
    return tempGames.map(el => {
      return (
        <GamePreview
          key={el._id}
          game={el}
          currentGameId={props.addGame ? -1 : props.currentGameId}
          onClick={() => {
            props.changeCurrentGameId(el._id);
            props.finishAddGame();
          }}
        />
      );
    });
  };

  const updateFilter = e => {
    if (e.target.value === 'All') {
      setFilterCriteria('');
    } else {
      console.log('aja');
      setFilterCriteria(e.target.value);
    }
    if (filterCriteria === 'All') {
      return;
    }
  };

  return (
    <div className="game-list">
      <h2>Available games</h2>
      <div className="game-list__grid">
        <div className="game-list__add">
          {/* Label for add button*/}
          <div className="game-list__add__label">Create new</div>
          {/* Board grid*/}
          <button
            className={`game-list__add__button ${
              props.addGame ? 'game-list__add__button--selected' : ''
            }`}
            onClick={props.setAddGame}
          >
            <img src={'/icons/add.svg'} alt="Add icon" />
          </button>
        </div>

        {filterActiveGames(props.activeGames)}
      </div>
      <div className="game-list__filter">
        <label className="game-list__text" htmlFor="boardSize">
          Filter board size
        </label>
        <select
          id="boardSize"
          name="boardSize"
          className="game-list__input"
          value={filterCriteria}
          onChange={updateFilter}
        >
          {sizeOptions}
        </select>
      </div>
    </div>
  );
};

export default GameList;

GameList.propTypes = {
  currentGameId: PropTypes.number,
  activeGames: PropTypes.arrayOf(PropTypes.object),
  changeCurrentGameId: PropTypes.func,
  addGame: PropTypes.bool,
  finishAddGame: PropTypes.func,
  setAddGame: PropTypes.func,
};
