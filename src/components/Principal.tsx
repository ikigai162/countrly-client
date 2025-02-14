import React, { useEffect, useState, KeyboardEvent, useRef } from "react";
import axios from "axios";
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

const Principal: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [countries, setCountries] = useState<Country[]>([]);
  const [currentShape, setCurrentShape] = useState("");
  const [countryName, setCountryName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState(false);

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
      setTargetCountry(randomCountry.name.toLocaleLowerCase());
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
        handleFetchDistance();
      }
    }
  };

  const handlePopUp = () => {};

  const [targetCountry, setTargetCountry] = useState("");
  const [distance, setDistance] = useState<number | null>(null);
  const [direction, setDirection] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [showIndications, setShowIndications] = useState(false);
  const [lastInputValue, setLastInputValue] = useState("");
  const [countryFlag, setcountryFlag] = useState<string | null>(null);

  const handleFetchDistance = async () => {
    if (!inputValue || !targetCountry) {
      console.error("Both user input and target country failed.");
      return;
    }

    if (inputValue.toLowerCase() === countryName.toLowerCase()) {
      console.log("Correct!");
      setShowIndications(false); 
      setcountryFlag(null); 
      setLastInputValue(inputValue);
      selectRandomCountry(countries);
      setInputValue("");
      setSuggestions([]);
      inputRef.current?.focus();
      return;
    }

    const url = `https://exciting-wonder-production.up.railway.app/location/get-info-between-countries?userInputCountry=${encodeURIComponent(
      inputValue
    )}&targetCountry=${encodeURIComponent(targetCountry)}`;
    console.log("Generated URL:", url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
      setDistance(data.distance);
      setDirection(data.direction);
      console.log("Distance between countries:", Math.round(data.distance));
      console.log("Direction:", data.direction);

      // Fetch pentru steagul țării greșite
      const countryResponse = await fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(inputValue)}`
      );
      if (countryResponse.ok) {
        const countryData = await countryResponse.json();
        if (countryData && countryData[0]?.flags?.svg) {
          setcountryFlag(countryData[0].flags.svg); // Setează URL-ul steagului
        } else {
          setcountryFlag(null); // Dacă nu există steag, resetează
        }
      } else {
        setcountryFlag(null); // În cazul unei erori, resetează
      }

      setShowIndications(true); // Afișează indicațiile pentru răspuns greșit
      setLastInputValue(inputValue);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setInputValue("");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const directionIcons: { [key: string]: string } = {
    N: icons.up,
    S: icons.down,
    E: icons.right,
    W: icons.left,
    NE: icons.up_right,
    NW: icons.up_left,
    SE: icons.down_right,
    SW: icons.down_left,
  };

  let imageElement: JSX.Element | null = null;

  if (data && directionIcons[data.direction]) {
    imageElement = (
      <img
        src={directionIcons[data.direction]}
        alt={data.direction}
        style={{ width: "25px", height: "25px" }}
      />
    );
  } else if (data) {
    imageElement = <p>Unknown direction: {data.direction}</p>;
  }

  return (
    <>
      <div className="icon">
        <img className="logo" src={icons.logo} alt="Logo" />
        <div className="icon-list">
          <Popup
            trigger={<img className="podium" src={icons.podium} alt="Podium" />}
            modal
            nested
          >
            <Ranking />
          </Popup>
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

          <section className="indications">
            {showIndications &&
              indicationsData.map((indication) => (
                <div className="indicator-main" key={indication.id}>
                  <div className="indicator">
                    {countryFlag && (
                      <img
                        src={countryFlag}
                        alt={`Flag of ${lastInputValue}`}
                        className="country-flag"
                        style={{
                          width: "50px",
                          height: "30px",
                          marginLeft: "10px",
                        }}
                      />
                    )}
                    <p className="country-name">
                      {lastInputValue.charAt(0).toUpperCase() +
                        lastInputValue.slice(1)}
                    </p>
                  </div>
                  <div className="distance">
                    {distance !== null && <p>{Math.round(distance)} km</p>}
                  </div>
                  <div className="direction">
                    {<div className="direction-icon">{imageElement}</div>}
                  </div>
                </div>
              ))}
          </section>

          <button className="submit" onClick={handleFetchDistance}>
            Submit
          </button>
        </header>
      </div>
    </>
  );
};

export default Principal;
