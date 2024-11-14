import React from "react";
import { icons, indicationsData } from "./../img/constants";
import "./Indications.css";

function Indications() {
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
}

export default Indications;
