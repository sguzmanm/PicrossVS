import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";

import AccountsUIWrapper from "../components/auth/AccountUIWrapper.jsx";
import Router from "./Router.jsx";
import "./App.scss";

const App = props => {
  console.log("App props", props);

  return (
    <div className='app'>
      <AccountsUIWrapper />
      <Router currentUser={props.currentUser} userId={props.userId}></Router>
    </div>
  );
};

const AppContainer = withTracker(() => {
  return {
    currentUser: Meteor.user(),
    userId: Meteor.userId()
  };
})(App);

export default AppContainer;

App.propTypes = {
  userId: PropTypes.string,
  currentGame: PropTypes.object,
  currentUser: PropTypes.object
};
