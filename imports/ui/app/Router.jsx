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
  const user = props.currentUser;
  return (
    <Router>
      <Switch>
        <Route
          path='/'
          exact
          render={() => (user ? <Redirect to='/hub' /> : <Tutorial />)}
        />
        <Route
          path='/hub'
          render={() => (user ? <Hub /> : <Redirect to='/' />)}
        />
        <Route
          path='/game'
          render={() => (user ? <Game /> : <Redirect to='/' />)}
        />
        <Route
          render={() => (user ? <Redirect to='/hub' /> : <Redirect to='/' />)}
        />
      </Switch>
    </Router>
  );
}

export default AppRouter;
