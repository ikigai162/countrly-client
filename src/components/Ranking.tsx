<<<<<<< HEAD
import React from "react";
import { icons } from "../img/constants";
import Users from "./../constants/Users";
import "./Ranking.css";

function Ranking() {

  
=======
import React, { useEffect } from "react";
import Users from "../constants/Users";
import "./Ranking.css";

function Ranking({ closePopup }: { closePopup: () => void }) {
  useEffect(() => {
    fetch("http://localhost:8080/country/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP error at fetching ranking with status:${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Ranking data", data);
      })
      .catch((error) => console.error("Error at fetching data", error));
  }, []);

>>>>>>> bba4724 (Fixed some bugs)
  return (
    <div className="ranking">
      <h2 className="rank-title">Ranking</h2>
      <Users />
<<<<<<< HEAD
      {/* <button className="user-button">Close</button> */}
=======
      <button className="user-button" onClick={closePopup}>
        Close
      </button>
>>>>>>> bba4724 (Fixed some bugs)
    </div>
  );
}

<<<<<<< HEAD
export default Ranking;
=======
export default Ranking;
>>>>>>> bba4724 (Fixed some bugs)
