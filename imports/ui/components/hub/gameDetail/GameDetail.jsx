import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import "./GameDetail.scss";

import GamePreview from "../gamePreview/GamePreview.jsx";

class GameDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 0,
      numWaitedUsers: 0
    };
    this.addGame = this.addGame.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.updateNumWaitedUsers = this.updateNumWaitedUsers.bind(this);
  }

  addGame(e) {
    e.preventDefault();
    Meteor.call("games.insert", this.state.size, this.state.numWaitedUsers);
  }

  updateSize(size) {
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
      console.log("GAME", game);
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
              {game.board ? game.board.title : "???"}-
              {game.board ? game.board.length : "?"}
            </h4>
            {users}
          </div>
          {/*Define how to have a waiting room for the game*/}
          <button
            className='game-detail__button'
            onClick={() => console.log("Wiii I am playing")}>
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

    const numUserOptions = [1, 2, 3, 4].map(el => (
      <GamePreview
        key={el}
        onClick={() => this.updateNumWaitedUsers(el)}></GamePreview>
    ));
    const addForm = (
      <form onSubmit={this.addGame}>
        <label htmlFor='boardSize'></label>
        <select
          name='boardSize'
          value={this.state.size}
          onChange={e => this.updateSize(e.target.value)}>
          {sizeOptions}
        </select>

        {numUserOptions}
      </form>
    );

    return <div className='game-detail'>{addForm}</div>;
  }
}

export default GameDetail;
