import React, { useEffect, useState } from "react";
import { icons } from "../img/constants";
import Indications from "../constants/Indications";

import { getAllCountries } from "../app/countryService";
import { CountryDTO } from "../app/types";

import "./Principal.css";

const Principal: React.FC = () => {
  const [countries, setCountries] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [shape, setShape] = useState<string | null>(null);

  useEffect(() => {
      const fetchCountries = async () => {
          try {
              const data = await getAllCountries();
              setCountries(data);
          } catch (error) {
              console.error("Failed to fetch countries");
          }
      };

      fetchCountries();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      const country = countries.find(
          (c: any) => c.name.toLowerCase() === inputValue.toLowerCase()
      );

      if (country) {
          setMessage("Corect!");
          /* setShape(country.shape || "Shape not available"); */
      } else {
          setMessage("Greșit!");
          setShape(null);
      }

      setInputValue(""); // Resetăm input-ul
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
          <img className="header-img" src={icons.vector1} alt="shape" />
          <input
            className="input"
            type="text"
            placeholder="Enter your answer"
          />
          <Indications />
          <button className="submit">submit</button>
        </header>
      </div>
    </>
  );
};

export default Principal;
