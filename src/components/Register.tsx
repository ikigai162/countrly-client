<<<<<<< HEAD
/* https://exciting-wonder-production.up.railway.app/auth/register */

import React, { useEffect, useState } from "react";
import BlueBtn from "../constants/BlueBtn";
import GreenBtn from "../constants/GreenBtn";
import { icons } from "../img/constants";

import axios from "axios";

import "./Register.css";

function Register() {
  
  const toggleForm = () => {
    setIsActive(!isActive);
  };


  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<any>()

  const loginData = {
    username: username,
    password: password
  }


  useEffect(() => {
    fetch('https://exciting-wonder-production.up.railway.app/auth/login', {
    method: 'POST', // <--- Crucial change: Use POST
    headers: {
      'Content-Type': 'application/json' // Specify JSON content type
    },
    body: JSON.stringify(loginData) // Send login data as JSON
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP login error with status:${response.status}`)
      }
      return response.json();
    })
    .then((data) => {
      console.log("login api response:", data)
    })
    .catch((error) => console.error("Error at fetching login data", error))
  })

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userName = e.target.value.toLowerCase()
    setUsername(userName)
  }

  console.log(handleUsernameChange)
=======
import React, { useState } from "react";
import BlueBtn from "../constants/BlueBtn";
import GreenBtn from "../constants/GreenBtn";
import { icons } from "../img/constants";
import axios from "axios";
import "./Register.css";

function Register() {
  const [isActive, setIsActive] = useState(false); // Control formă activă
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const toggleForm = () => {
    setIsActive(!isActive); // Alternează între Login și Register
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isActive
      ? "https://exciting-wonder-production.up.railway.app/auth/register"
      : "https://exciting-wonder-production.up.railway.app/auth/login";

    const data = isActive
      ? { username, email, password } // Register
      : { username, password }; // Login

    try {
      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("API Response:", response.data);
    } catch (error: any) {
      console.error("Error:", error);
      const message =
        error.response?.data?.message || "A apărut o eroare. Încercați din nou.";
    }
  };
>>>>>>> d83a8f93fbdea21912254d650edc33316d5d6b97

  return (
    <>
      <img className="logo-register" src={icons.logo} alt="Logo" />
      <div className={`container ${isActive ? "active" : ""}`} id="container">
<<<<<<< HEAD
        <div className="form-container sign-up">
          <form>
            <h2>Sign Up</h2>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <BlueBtn text="Sign up" />
          </form>
        </div>

        <div className="form-container sign-in">
          <form>
            <h2>Sign In</h2>
            <input type="email" placeholder="Username" onChange={handleUsernameChange}/>
            <input type="password" placeholder="Password" />
            <BlueBtn text="Sign in" />
          </form>
        </div>
=======
        {isActive && ( // Formular Sign Up
          <div className="form-container sign-up">
            <form onSubmit={handleSubmit}>
              <h2>Sign Up</h2>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <BlueBtn text="Sign Up" />
            </form>
          </div>
        )}

        {!isActive && ( // Formular Sign In
          <div className="form-container sign-in">
            <form onSubmit={handleSubmit}>
              <h2>Sign In</h2>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <BlueBtn text="Sign In" />
            </form>
          </div>
        )}
>>>>>>> d83a8f93fbdea21912254d650edc33316d5d6b97

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h3>Welcome Back!</h3>
              <p>Sign up to play our game.</p>
<<<<<<< HEAD
              <GreenBtn
                text="Sign In"
                onClick={toggleForm}
              />
=======
              <GreenBtn text="Sign In" onClick={toggleForm} />
>>>>>>> d83a8f93fbdea21912254d650edc33316d5d6b97
            </div>
            <div className="toggle-panel toggle-right">
              <h3>Hello, Friend!</h3>
              <p>It’s nice to see you again.</p>
<<<<<<< HEAD
              <GreenBtn
                text="Sign Up"
                onClick={toggleForm}
              />
=======
              <GreenBtn text="Sign Up" onClick={toggleForm} />
>>>>>>> d83a8f93fbdea21912254d650edc33316d5d6b97
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD
=======

>>>>>>> d83a8f93fbdea21912254d650edc33316d5d6b97
    </>
  );
}

export default Register;
