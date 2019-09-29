import React from "react";
import { Meteor } from "meteor/meteor";
import { PropTypes } from "prop-types";

import "./Loading.scss";

// Abandon the game by dropping out
const abandonGame = (id, history) => {
  Meteor.call("games.removeUser", id);
  history.push("/hub");
};

const Loading = props => {
  // Consts used
  const game = props.currentGame;
  const currentUser = props.currentUser;
  let users = [];
  // Setup users signed into the game
  if (game) {
    users = game.players.map((el, index) => (
      <p key={index}>
        {el.user && el.user.username ? el.user.username : "???"}
      </p>
    ));
  }

  let showButton = true;
  let remainingUsers =
    game && game.numWaitedUsers ? game.numWaitedUsers - users.length : "";

  let msg = "";
  // Setup message
  if (remainingUsers === 1) msg = `Still waiting for ${remainingUsers} player`;
  else msg = `Still waiting for ${remainingUsers} players`;

  // REdirect if the user is not part of the game
  if (
    game &&
    (!currentUser ||
      !game.players.some(el => el.user.username === currentUser.username))
  ) {
    showButton = false;
    msg =
      "You are not part of this game, you will be redirected to the home screen";
    setTimeout(() => {
      props.history.push("/hub");
    }, 5000);
  }
  // Return loader
  return (
    <div className='loader'>
      <div className='loader__content'>
        <div className='loader__cube'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h4>{msg}</h4>
        <h4>Current players</h4>
        {users}
        {showButton ? (
          <button onClick={() => abandonGame(game._id, props.history)}>
            DROP OUT
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Loading;

Loading.propTypes = {
  history: PropTypes.any,
  currentGame: PropTypes.object,
  currentUser: PropTypes.object
};
