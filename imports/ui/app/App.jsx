import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import AccountsUIWrapper from "../components/auth/AccountUIWrapper.jsx";
import Router from "./Router.jsx";
import "./App.scss";

const App = props => {
  return (
    <div>
      <AccountsUIWrapper />
      <Router currentUser={props.currentUser}></Router>
    </div>
  );
};

export default AppContainer = withTracker(() => {
  return {
    currentUser: Meteor.user(),
    userId: Meteor.userId()
  };
})(App);
