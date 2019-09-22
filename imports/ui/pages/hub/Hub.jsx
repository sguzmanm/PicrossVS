import React from "react";
import "./Hub.scss";

import GameDetail from "../../components/hub/gameDetail/GameDetail.jsx";
import GameList from "../../components/hub/gameList/GameList.jsx";

const Hub = () => {
  return (
    <div className='hub'>
      <GameList />
      <GameDetail />
    </div>
  );
};

export default Hub;
