import React from "react";
import { icons } from "./../img/constants";
import Indications from "../constants/Indications";

import "./Principal.css";

function Principal() {
  return (
    <>
      <div className="icon">
        <img className="logo" src={icons.logo} alt="Logo" />
        <div className="icon-list">
          <img className="podium" src={icons.podium} alt="Podium" />
          <img className="graph" src={icons.graph} alt="Graph" />
          <img className="settings" src={icons.settings} alt="Settings" />
          <img className="info" src={icons.info} alt="Info" />
        </div>
      </div>
      <div className="container-principal">
        <header className="header">
          <h1 className="motto">TAKE YOUR GUESS</h1>
          <img className="header-img" src={icons.vector1} alt="vector1" />
          <input
            className="input"
            type="text"
            placeholder="Enter your answer"
          />
          <Indications />
          <button className="submit">submit</button>
        </header>
      </div>
    </>
  );
}

export default Principal;
