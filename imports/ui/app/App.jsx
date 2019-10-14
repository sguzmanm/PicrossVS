/*Me parece que trabajaron de una manera muy ordena y clara desde un principio, la aplicacion me parece genial y muy facil de usar, creo que cumplierón 
los objetivos del proyecto y lo hicieron muy bien. Me parecio genial que pudierna desplegar la aplicación ya que no es facil en su totalidad.
Finalmente quisiera decir que toda la estructura del proyecto es espectacular, muy claro de entender para cualquier persona que este interesado en 
ver su codigó, los felicito una vez mas. Lo unico que les resaltaria es que comentaran el codigó, para que la gente menos experta pueda tambien entender
su codigó.*/

import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { PropTypes } from "prop-types";

import Nav from "../components/nav/Nav.jsx";
import Router from "./Router.jsx";
import "./App.scss";

const App = props => {

  return (
    <div className='app'>
      <Nav />
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
