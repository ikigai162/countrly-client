import React, { useEffect } from "react";
import { icons } from "../img/constants";
import Users from "./../constants/Users";
import "./Ranking.css";

function Ranking({ closePopup }: { closePopup: () => void }) {
  

  return (
    <div className="ranking">
      <h2 className="rank-title">Ranking</h2>
      <Users />
      <button className="user-button" onClick={closePopup}>Close</button>
    </div>
  );
}

export default Ranking;
