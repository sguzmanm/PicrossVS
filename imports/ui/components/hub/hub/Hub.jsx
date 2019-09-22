import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import "./Hub.scss";

//Subcomponents
import GameDetail from "../gameDetail/GameDetail.jsx";
import GameList from "../gameList/GameList.jsx";

// Games collections and topics
import { activeGamesTopic } from "../../../../util/topics";
import { Games } from "../../../../api/games";

const Hub = props => {
  // React state
  const [currentGameId, setCurrentGameId] = useState(-1);
  let currentGame = props.activeGames.find(el => el._id === currentGameId);

  return (
    <div className='hub'>
      <GameList
        activeGames={props.activeGames}
        currentGameId={currentGame ? currentGame._id : -1}
        changeCurrentGameId={setCurrentGameId}
      />
      <GameDetail currentGame={currentGame} />
    </div>
  );
};

// Export with props from backend
export default HubContainer = withTracker(() => {
  Meteor.subscribe(activeGamesTopic);
  return {
    activeGames: Games.find({}).fetch()
  };
})(Hub);
