import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import "./Hub.scss";

//Subcomponents
import GameDetail from "./gameDetail/GameDetail.jsx";
import GameList from "./gameList/GameList.jsx";
import Ranking from "./ranking/Ranking.jsx";

// Games collections and topics
import { gamesTopic, usersTopic } from "../../../util/topics";
import { Games } from "../../../api/games";
import { Users } from "../../../api/users";
import { WAITING } from "../../../util/gameStates";

const Hub = props => {
  // React state
  const [currentGameId, setCurrentGameId] = useState("");
  const [addGame, setAddGame] = useState(false);
  let currentGame = props.activeGames.find(el => el._id === currentGameId);

  return (
    <div className='hub'>
      <GameList
        addGame={addGame}
        finishAddGame={() => setAddGame(false)}
        setAddGame={() => setAddGame(true)}
        activeGames={props.activeGames}
        currentGameId={currentGame ? currentGame._id : ""}
        changeCurrentGameId={setCurrentGameId}
      />
      <Ranking users={props.users}></Ranking>
      <GameDetail
        history={props.history}
        currentGame={currentGame}
        addGame={addGame}
        finishAddGame={() => setAddGame(false)}
      />
    </div>
  );
};

// Export with props from backend
const HubContainer = withTracker(() => {
  Meteor.subscribe(gamesTopic);
  Meteor.subscribe(usersTopic);
  return {
    activeGames: Games.find({ state: WAITING }).fetch(),
    users: Users.find().fetch()
  };
})(Hub);

export default HubContainer;

Hub.propTypes = {
  history: PropTypes.any,
  users: PropTypes.arrayOf(PropTypes.object),
  activeGames: PropTypes.arrayOf(PropTypes.object)
};
