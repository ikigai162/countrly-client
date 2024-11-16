import React, { useEffect, useState } from "react";
import { icons } from "../img/constants";
import Indications from "../constants/Indications";

import "./Principal.css";

const Principal: React.FC = () => {
  const [countries, setCountries] = useState([]);
  const [currentShape, setCurrentShape] = useState("");
  const [countryName, setCountryName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://exciting-wonder-production.up.railway.app/country")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API response:", data);
        setCountries(data);
        selectRandomCountry(data);
      })
      .catch((error) => console.error("Error at fetching countries:", error));
  }, []);

  const selectRandomCountry = (data) => {
    const randomCountry = data[Math.floor(Math.random() * data.length)];
    if (randomCountry?.shape?.image) {
      const base64Image = `data:image/png;base64,${randomCountry.shape.image}`;
      setCurrentShape(base64Image);
      setCountryName(randomCountry.name.toLowerCase());
    } else {
      console.error("No shape available");
    }
  };

  const handleSubmit = () => {
    if (inputValue.toLowerCase() === countryName) {
      setMessage("Correct!");
    } else {
      console.info("Wrong! Try again.")
      setMessage("Wrong! Try again.");
    }

    selectRandomCountry(countries);
    setInputValue("");
  };

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
          {currentShape ? (
            <img className="header-img" src={currentShape} alt="shape" />
          ) : (
            <p>No shape available</p>
          )}

          <input
            className="input"
            type="text"
            placeholder="Enter your answer"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Indications />
          <button className="submit" onClick={handleSubmit}>
            Submit
          </button>
          <p>{message}</p>
        </header>
      </div>
    </>
  );
};

export default Principal;
