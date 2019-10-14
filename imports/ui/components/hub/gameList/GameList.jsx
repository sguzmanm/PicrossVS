import React, { useState } from "react";
import { PropTypes } from "prop-types";
import "./GameList.scss";

import GamePreview from "../gamePreview/GamePreview.jsx";

const GameList = props => {
  // Filter
  const [filterCriteria, setFilterCriteria] = useState("");

  const sizeOptions = ["All", 5, 10, 20].map(el => (
    <option key={el} value={el}>
      {el}
    </option>
  ));

  const filterActiveGames = games => {
    if (games === null) return;

    let tempGames = games;
    if (filterCriteria !== "")
      tempGames = games.filter(el => {
        return el.players[0].board.rows.length === parseInt(filterCriteria, 10);
      });
    return tempGames.map(el => {
      return (
        <GamePreview
          key={el._id}
          game={el}
          currentGameId={props.addGame ? "" : props.currentGameId}
          onClick={() => {
            props.changeCurrentGameId(el._id);
            props.finishAddGame();
          }}
        />
      );
    });
  };

  const updateFilter = e => {
    if (e.target.value === "All") {
      setFilterCriteria("");
    } else {
      setFilterCriteria(e.target.value);
    }
    if (filterCriteria === "All") {
      return;
    }
  };

  return (
    <div className={`game-list ${props.addGame ? "" : "game-list--inactive"}`}>
      <div className='game-list__header'>
        <h2 className='game-list__games'>Available games</h2>
        <button
          className={`game-list__add__button ${
            props.addGame ? "game-list__add__button--selected" : ""
          }`}
          onClick={props.setAddGame}>
          <img
            className='game-list__add__icon'
            src={"/icons/add.svg"}
            alt='Add icon'
          />
        </button>
      </div>
      <div className='game-list__grid'>
        {filterActiveGames(props.activeGames)}
      </div>
      <div className='game-list__filter'>
        <select
          id='boardSize'
          name='boardSize'
          className='game-list__input'
          value={filterCriteria}
          onChange={updateFilter}>
          {sizeOptions}
        </select>
      </div>
    </div>
  );
};

export default GameList;

GameList.propTypes = {
  currentGameId: PropTypes.string,
  activeGames: PropTypes.arrayOf(PropTypes.object),
  changeCurrentGameId: PropTypes.func,
  addGame: PropTypes.bool,
  finishAddGame: PropTypes.func,
  setAddGame: PropTypes.func
};
