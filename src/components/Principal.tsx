import React, { useEffect, useState, KeyboardEvent, useRef, useMemo, useCallback } from "react";
import Popup from "reactjs-popup";
import { icons, indicationsData } from "../img/constants";
import Ranking from "./Ranking";
import "../constants/Indications.css";
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

interface Indication {
  guess: string;
  distance: number;
  direction: string;
  flagUrl: string;
}

const Principal: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [countries, setCountries] = useState<Country[]>([]);
  const [currentShape, setCurrentShape] = useState("");
  const [countryName, setCountryName] = useState("");
  const [targetCountry, setTargetCountry] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const [isOpen, setIsOpen] = useState(false);
  const [isThemePopupOpen, setIsThemePopupOpen] = useState(false);

  const [lastInputValue, setLastInputValue] = useState("");
  const [showIndications, setShowIndications] = useState(false);
  const [indications, setIndications] = useState<Indication[]>([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const directionIcons = useMemo(
    () => ({
      N: icons.up,
      S: icons.down,
      E: icons.right,
      W: icons.left,
      NE: icons.up_right,
      NW: icons.up_left,
      SE: icons.down_right,
      SW: icons.down_left
    }),
    []
  );

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("http://localhost:8080/country");
        if (!response.ok) {
          throw new Error(`HTTP error with status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data);
        selectRandomCountry(data);
      } catch (error) {
        console.error("Error at fetching countries", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  const selectRandomCountry = useCallback((data: Country[]) => {
    const randomCountry = data[Math.floor(Math.random() * data.length)];
    if (randomCountry?.shape?.image) {
      const base64Image = `data:image/png;base64,${randomCountry.shape.image}`;
      setCurrentShape(base64Image);
      const correctName = randomCountry.name.toLowerCase();
      setCountryName(correctName);
      setTargetCountry(correctName);
    } else {
      console.error("No shape available");
    }
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    [countries]
  );

  useEffect(() => {
    if (activeIndex !== -1 && suggestions.length > 0) {
      const activeElement = document.querySelector(
        `.suggestions li:nth-child(${activeIndex + 1})`
      );
      activeElement?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeIndex, suggestions]);

  const fetchDistanceAndFlag = useCallback(
    async (userGuess: string) => {
      try {
        const url = `http://localhost:8080/location/get-info-between-countries?userInputCountry=${encodeURIComponent(
          userGuess
        )}&targetCountry=${encodeURIComponent(countryName)}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const distanceData = await response.json();
        const { distance, direction } = distanceData;

        const flagResponse = await fetch(
          `https://restcountries.com/v3.1/name/${encodeURIComponent(userGuess)}`
        );
        if (!flagResponse.ok) {
          throw new Error(`HTTP error! Status: ${flagResponse.status}`);
        }
        const flagData = await flagResponse.json();
        const flagUrl = flagData[0]?.flags?.png;

        setIndications((prev) => [
          ...prev,
          { guess: userGuess, distance, direction, flagUrl }
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIndications((prev) => [
          ...prev,
          {
            guess: userGuess,
            distance: 0,
            direction: "Unknown",
            flagUrl: ""
          }
        ]);
      }
    },
    [countryName]
  );

  const handleSubmit = useCallback(async () => {
    const userGuess = inputValue.toLowerCase().trim();
    if (userGuess === "") return;

    if (userGuess === countryName) {
      console.log("Correct!");
      setLastInputValue(userGuess);
      selectRandomCountry(countries);
      setShowIndications(false);
      setIndications([]);
    } else {
      setLastInputValue(userGuess);
      setShowIndications(true);
      await fetchDistanceAndFlag(userGuess);
    }

    setInputValue("");
    setSuggestions([]);
    inputRef.current?.focus();
  }, [
    inputValue,
    countryName,
    countries,
    fetchDistanceAndFlag,
    selectRandomCountry
  ]);

  const handleSuggestionClick = useCallback((name: string) => {
    setInputValue(name);
    setSuggestions([]);
    setActiveIndex(-1);
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev >= suggestions.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev <= 0 ? suggestions.length - 1 : prev - 1
        );
      } else if (e.key === "Enter") {
        if (activeIndex !== -1 && suggestions[activeIndex]) {
          handleSuggestionClick(suggestions[activeIndex].name);
        } else {
          handleSubmit();
        }
      }
    },
    [activeIndex, suggestions, handleSubmit, handleSuggestionClick]
  );

  
  const toggleTheme = useCallback(() => {
    setIsDarkTheme((prev) => !prev);
  }, []);

  return (
    <>
      <div className="icon">
        <img className="logo" src={icons.logo} alt="Logo" />
        <div className="icon-list">
          <img className="graph" src={icons.graph} alt="Graph" />
          <img
            className="podium"
            src={icons.podium}
            alt="Podium"
            onClick={() => setIsOpen(true)}
          />
          <Popup modal nested open={isOpen} onClose={() => setIsOpen(false)}>
            <Ranking closePopup={() => setIsOpen(false)} />
          </Popup>
          <Popup
            modal
            nested
            open={isThemePopupOpen}
            onClose={() => setIsThemePopupOpen(false)}
          >
            <div className="theme-toggle-container">
              <span className="theme-text">Dark theme</span>
              <div className="toggle-switch">
                <button
                  className={`toggle-button ${isDarkTheme ? "on" : "off"}`}
                  onClick={toggleTheme}
                >
                  {isDarkTheme ? "ON" : "OFF"}
                </button>
              </div>
            </div>
          </Popup>
          <img
            className="settings"
            src={icons.settings}
            alt="Settings"
            onClick={() => setIsThemePopupOpen(true)}
          />
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
              onKeyDown={handleKeyDown}
              autoFocus
              ref={inputRef}
            />
            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((country, index) => (
                  <li
                    key={country.id}
                    className={index === activeIndex ? "active" : ""}
                    onClick={() => handleSuggestionClick(country.name)}
                  >
                    {country.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <section className="indications">
            {showIndications &&
              indications.map((indication, index) => (
                <div key={index} className="indicator-main">
                  <div className="indicator">
                    {indication.flagUrl && (
                      <img
                        src={indication.flagUrl}
                        alt={`${indication.guess} flag`}
                        style={{
                          width: "25px",
                          height: "15px",
                          marginRight: "10px",
                          verticalAlign: "middle"
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                    <p className="country-name">
                      {indication.guess.charAt(0).toUpperCase() +
                        indication.guess.slice(1)}
                    </p>
                  </div>
                  <div className="distance">
                    <p>{Math.round(indication.distance)} km</p>
                  </div>
                  <div className="direction">
                    <div className="direction-icon">
                      {directionIcons[indication.direction] ? (
                        <img
                          src={directionIcons[indication.direction]}
                          alt={indication.direction}
                          style={{ width: "25px", height: "25px" }}
                        />
                      ) : (
                        <p>Unknown direction: {indication.direction}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </section>
          <button className="submit" onClick={handleSubmit}>
            Submit
          </button>
        </header>
      </div>
    </>
  );
};

export default Principal;