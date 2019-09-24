import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { PropTypes } from "prop-types";

import "./Router.scss";

import Tutorial from "../pages/tutorial/Tutorial.jsx";
import Game from "../pages/game/Game.jsx";
import Hub from "../pages/hub/Hub.jsx";

function AppRouter(props) {
  const userId = props.userId;
  const currentUser = props.currentUser;
  return (
    <div className='router'>
      <Router>
        <Switch>
          <Route
            path='/'
            exact
            render={() => (userId ? <Redirect to='/hub' /> : <Tutorial />)}
          />
          <Route
            path='/hub'
            render={props =>
              userId ? <Hub {...props} /> : <Redirect to='/' />
            }
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
            render={() =>
              userId ? <Redirect to='/hub' /> : <Redirect to='/' />
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default AppRouter;

AppRouter.propTypes = {
  userId: PropTypes.string,
  currentUser: PropTypes.object
};
