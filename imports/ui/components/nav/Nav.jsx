import React from "react";

import AccountsUIWrapper from "../auth/AccountUIWrapper.jsx";
import "./Nav.scss";

const Nav = () => {
  return (
    <div className='nav'>
      <div style={{ width: "5rem" }}></div>
      <h1 className='nav__title'>PicrossVS</h1>
      <AccountsUIWrapper />
    </div>
  );
};

export default Nav;
