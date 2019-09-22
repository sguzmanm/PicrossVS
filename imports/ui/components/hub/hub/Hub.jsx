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
  const [currentGame, setCurrentGame] = useState(-1);

  console.log("From meteor ", props.activeGames);
  return (
    <div className='hub'>
      <GameList
        activeGames={props.activeGames}
        changeCurrentGame={index => setCurrentGame(index)}
      />
      <GameDetail currentGame={props.activeGames[currentGame]} />
    </div>
  );
};

export default HubContainer = withTracker(() => {
  Meteor.subscribe(activeGamesTopic);
  return {
    activeGames: Games.find({}).fetch()
  };
})(Hub);
