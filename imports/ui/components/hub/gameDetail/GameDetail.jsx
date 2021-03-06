import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { PropTypes } from "prop-types";
import "./GameDetail.scss";

import GamePreview from "../gamePreview/GamePreview.jsx";

class GameDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 5,
      numWaitedUsers: 0
    };
    this.createGame = this.createGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.updateNumWaitedUsers = this.updateNumWaitedUsers.bind(this);
  }

  createGame() {
    Meteor.call(
      "games.insert",
      this.state.size,
      this.state.numWaitedUsers,
      (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
        this.props.history.push(`/game/${result}`);
      }
    );
  }

  joinGame(id) {
    Meteor.call("games.addUser", id);
    this.props.history.push(`/game/${id}`);
  }

  updateSize(event) {
    let size = parseInt(event.target.value, 10);
    this.setState({ size: size });
  }

  updateNumWaitedUsers(numWaitedUsers) {
    this.setState({ numWaitedUsers: numWaitedUsers });
  }

  render() {
    // Return if no add menu specified
    if (!this.props.addGame && !this.props.currentGame) return null;

    // Render game details
    if (!this.props.addGame) {
      let game = this.props.currentGame;
      let board =
        game.players && game.players.length > 0
          ? game.players[0].board
          : undefined;
      let users = game.players.map((el, index) => (
        <h4
          key={index}
          className={`game-detail__text game-detail__text--color${index}`}>
          {el.user ? el.user.username : "A cool user"}
        </h4>
      ));

      return (
        <div className='game-detail'>
          <div>
            <h4 className='game-detail__title'>
              {board && board.name ? board.name : "???"}:
              {board && board.rows ? board.rows.length : "?"}X
              {board && board.columns ? board.columns.length : "?"}
            </h4>
            <div className='game-detail__players'>{users}</div>
          </div>
          {/*TODO: Define how to have a waiting room for the game*/}
          <button
            className='game-detail__button'
            onClick={() => this.joinGame(game._id)}>
            PLAY
          </button>
        </div>
      );
    }

    // Render add data form
    const sizeOptions = [5, 10, 20].map(el => (
      <option key={el} value={el}>
        {el}
      </option>
    ));

    const numUserOptions = [1, 2, 3, 4].map(el => {
      return (
        <GamePreview
          key={el}
          game={{ _id: el, numWaitedUsers: el }}
          currentGameId={this.state.numWaitedUsers}
          onClick={() => this.updateNumWaitedUsers(el)}></GamePreview>
      );
    });

    return (
      <div className='game-detail'>
        <h4 className='game-detail__title'>New Game</h4>
        <div className='game-detail__row'>
          <label className='game-detail__text' htmlFor='boardSize'>
            Board size
          </label>
          <select
            className='game-detail__input'
            id='boardSize'
            name='boardSize'
            value={this.state.size}
            onChange={this.updateSize}>
            {sizeOptions}
          </select>
        </div>
        <h4 className='game-detail__text'>Number of players</h4>
        <div className='game-detail__board-list'>{numUserOptions}</div>
        <button
          className='game-detail__button'
          type='submit'
          onClick={() => this.createGame()}>
          PLAY
        </button>
      </div>
    );
  }
}

export default GameDetail;

GameDetail.propTypes = {
  history: PropTypes.any,
  currentGame: PropTypes.object,
  addGame: PropTypes.bool
};
