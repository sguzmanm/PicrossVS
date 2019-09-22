import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

import "../imports/util/accounts-ui.js";
import App from "/imports/ui/app/App.jsx";

Meteor.startup(() => {
  render(<App />, document.getElementById("react-target"));
});
