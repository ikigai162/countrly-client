import React, { useEffect, useState } from "react";
import { icons, indicationsData } from "./../img/constants";
import "./Indications.css";

import Principal from "./../components/Principal";

function Indications() {
  const [inputValue, setInputValue] = useState("");
  const [countryName, setCountryName] = useState("");

  /* useEffect(() => {
    fetch(
      `https://exciting-wonder-production.up.railway.app/location/get-info-between-countries?userInputCountry=${Principal.setInputValue}&targetCountry=${Principal.countryName}`
    )
      .then((response) => {
        if (!response) {
          throw new Error(`HTTP error with status:${response.status}`);
        }
        return response.json();
      })
      .then((data) => {

      })
      .catch((error) => console.error("Error at fetching indications", error));
  }, []); */

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
