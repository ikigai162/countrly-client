import React, { useEffect, useState, KeyboardEvent, useRef } from "react";
import Popup from "reactjs-popup";

import { icons } from "../img/constants";
import Indications from "../constants/Indications";
import Ranking from "./Ranking";

import "./Principal.css";

interface Shape {
  id: number;
  image: string;
}

interface Complexity {
  id: number;
  complexity: string;
}

interface Country {
  id: number;
  name: string;
  complexity: Complexity;
  shape: Shape;
}

const Principal: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [countries, setCountries] = useState<Country[]>([]);
  const [currentShape, setCurrentShape] = useState("");
  const [countryName, setCountryName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    fetch("https://exciting-wonder-production.up.railway.app/country")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        /* console.log("API response: ", data); */
        setCountries(data);
        selectRandomCountry(data);
      })
      .catch((error) => console.error("Error at fetching countries", error));
  }, []);

  const selectRandomCountry = (data: Country[]) => {
    const randomCountry = data[Math.floor(Math.random() * data.length)];
    if (randomCountry?.shape?.image) {
      const base64Image = `data:image/png;base64,${randomCountry.shape.image}`;
      setCurrentShape(base64Image);
      setCountryName(randomCountry.name.toLocaleLowerCase());
    } else {
      console.error("No shape available");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);

    if (value) {
      const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(value)
      );
      setSuggestions(filteredCountries);
      setActiveIndex(-1);
    } else {
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  const handleSuggestionClick = (name: string) => {
    setInputValue(name);
    setSuggestions([]);
    setActiveIndex(-1);
  };
  const handleSubmit = () => {
    if (inputValue.toLowerCase() === countryName) {
      console.log("Correct!");
      selectRandomCountry(countries);
    } else {
      alert("Wrong! Try again.");
    }

    setInputValue("");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (activeIndex !== -1 && suggestions[activeIndex]) {
        handleSuggestionClick(suggestions[activeIndex].name);
      } else {
        handleSubmit();
      }
    }
  };

  return (
    <>
      <div className="icon">
        <img className="logo" src={icons.logo} alt="Logo" />
        <div className="icon-list">
          <img className="podium" src={icons.podium} alt="Podium" />

          <Popup
            trigger={<img className="graph" src={icons.graph} alt="Graph" />} modal nested>
            <Ranking />
          </Popup>

          {/* <Popup trigger={<button> Click to open modal </button>} modal nested>
            {(close) => (
              <div className="modal">
                <div className="content">Welcome to GFG!!!</div>
                <div>
                  <button onClick={() => close()}>Close modal</button>
                </div>
              </div>
            )}
          </Popup> */}

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

          <div className="input-wrapper">
            <input
              className="input"
              type="text"
              placeholder="Enter your answer"
              value={inputValue}
              onChange={handleInputChange}
              onKeyUp={handleKeyPress}
              autoFocus
              ref={inputRef}
            />

            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((country) => (
                  <li
                    key={country.id}
                    onClick={() => handleSuggestionClick(country.name)}
                  >
                    {country.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Indications />
          <button className="submit" onClick={handleSubmit}>
            Submit
          </button>
          <p className="message"></p>
        </header>
      </div>
    </>
  );
};

export default Principal;
