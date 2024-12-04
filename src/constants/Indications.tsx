import React, { useEffect, useState } from "react";
import { icons, indicationsData } from "../img/constants";
import "./Indications.css";

const Indications: React.FC = () => {
  const MY_API_KEY = "c7c4f48cd241719c97ca513c34713ed0";
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch(
      `https://api.positionstack.com/v1/forward?access_key=${MY_API_KEY}&query={LOCATION}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  },[]);

  return (
    <div className="indications">
      {indicationsData.map((indication) => (
        <>
          <div className="indicator-main">
            <div key={indication.id} className="indicator">
              <img
                src={indication.country}
                alt={indication.label}
                className="flag"
              />
              <p className="country-name">{indication.label}</p>
            </div>
            <div className="distance">
              <p>~{indication.distance}km</p>
            </div>
            <div className="direction">
              <img
                src={indication.icon}
                alt="direction-icon"
                className="direction-icon"
              />
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Indications;
