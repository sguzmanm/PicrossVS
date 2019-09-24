import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Tutorial from "../pages/tutorial/Tutorial.jsx";
import Game from "../pages/game/Game.jsx";
import Hub from "../pages/hub/Hub.jsx";

function AppRouter(props) {
  const userId = props.userId;
  const currentUser = props.currentUser;
  console.log("Current userId", userId);
  console.log("Current props", props);
  console.log("Current match", props.match);
  return (
    <Router>
      <Switch>
        <Route
          path='/'
          exact
          render={() => (userId ? <Redirect to='/hub' /> : <Tutorial />)}
        />
        <Route
          path='/hub'
          render={props => (userId ? <Hub {...props} /> : <Redirect to='/' />)}
        />
        <Route
          path='/game/:id'
          render={props =>
            userId ? (
              <Game {...props} currentUser={currentUser} />
            ) : (
              <Redirect to='/' />
            )
          }
        />
        <Route
          render={() => (userId ? <Redirect to='/hub' /> : <Redirect to='/' />)}
        />
      </Switch>
    </Router>
  );
}

export default AppRouter;
