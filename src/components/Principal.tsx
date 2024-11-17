import React, { useEffect, useState, KeyboardEvent } from "react";
import { icons } from "../img/constants";
import Indications from "../constants/Indications";

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
  const [countries, setCountries] = useState<Country[]>([]);
  const [currentShape, setCurrentShape] = useState("");
  const [countryName, setCountryName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://exciting-wonder-production.up.railway.app/country")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Country[]) => {
        console.log("API response:", data);
        setCountries(data);
        selectRandomCountry(data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const selectRandomCountry = (data: Country[]) => {
    const randomCountry = data[Math.floor(Math.random() * data.length)];
    if (randomCountry?.shape?.image) {
      const base64Image = `data:image/png;base64,${randomCountry.shape.image}`;
      setCurrentShape(base64Image);
      setCountryName(randomCountry.name.toLowerCase());
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
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (name: string) => {
    setInputValue(name);
    setSuggestions([]);
  };

  const handleSubmit = () => {
    if (inputValue.toLowerCase() === countryName) {
      setMessage("Correct!");
      selectRandomCountry(countries);
    } else {
      alert("Wrong! Try again.");
    }

    setInputValue("");
    setSuggestions([]);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
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

          {/* Input pentru răspuns */}
          <div className="input-wrapper">
            <input
              className="input"
              type="text"
              placeholder="Enter your answer"
              value={inputValue}
              onChange={handleInputChange}
              onKeyUp={handleKeyPress}
            />
            {/* Afișarea sugestiilor */}
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
          <p className="message">{message}</p>
        </header>
      </div>
    </>
  );
};

export default Principal;
