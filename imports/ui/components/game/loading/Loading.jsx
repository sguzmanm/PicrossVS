import React from "react";
import "./Loading.scss";

const Loading = props => {
  const game = props.currentGame;
  const currentUser = props.currentUser;
  let users = [];
  if (game) {
    users = game.players.map((el, index) => (
      <p key={index}>
        {el.user && el.user.username ? el.user.username : "???"}
      </p>
    ));
  }

  let showButton = true;
  let msg = `Still waiting for players ${4 - users.length}`;

  if (
    !currentUser ||
    !users.some(username => username === currentUser.username)
  ) {
    console.log("Not part");
    showButton = false;
    msg =
      "You are not part of this game, you will be redirected to the home screen";
    setTimeout(() => {
      props.history.push("/hub");
    }, 5000);
  }
  return (
    <div className='loader'>
      <div className='loader__cube'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className='loader__content'>
        <h4>{msg}</h4>
        {users}
        {showButton ? (
          <button onClick={() => console.log("TEST")}>CANCEL</button>
        ) : null}
      </div>
    </div>
  );
};

export default Loading;
