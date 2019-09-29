import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";
import "./Hub.scss";

//Subcomponents
import GameDetail from "./gameDetail/GameDetail.jsx";
import GameList from "./gameList/GameList.jsx";

// Games collections and topics
import { gamesTopic } from "../../../util/topics";
import { Games } from "../../../api/games";
import { WAITING } from "../../../util/gameStates";

const Hub = props => {
  // React state
  const [currentGameId, setCurrentGameId] = useState(-1);
  const [addGame, setAddGame] = useState(false);
  let currentGame = props.activeGames.find(el => el._id === currentGameId);

  return (
    <div className='hub'>
      <GameList
        addGame={addGame}
        finishAddGame={() => setAddGame(false)}
        setAddGame={() => setAddGame(true)}
        activeGames={props.activeGames}
        currentGameId={currentGame ? currentGame._id : -1}
        changeCurrentGameId={setCurrentGameId}
      />
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
  return {
    activeGames: Games.find({ state: WAITING }).fetch()
  };
})(Hub);

export default HubContainer;

Hub.propTypes = {
  history: PropTypes.any,
  activeGames: PropTypes.arrayOf(PropTypes.object)
};
