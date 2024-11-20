import React from "react";
import { icons } from "../img/constants";
import Users from "./../constants/Users";
import "./Ranking.css";

function Ranking() {

  
  return (
    <div className="ranking">
      <h2 className="rank-title">Ranking</h2>
      <Users />
      {/* <button className="user-button">Close</button> */}
    </div>
  );
}

export default Ranking;
