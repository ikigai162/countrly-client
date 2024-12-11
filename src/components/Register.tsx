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

  return (
    <>
      <img className="logo-register" src={icons.logo} alt="Logo" />
      <div className={`container ${isActive ? "active" : ""}`} id="container">
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

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h3>Welcome Back!</h3>
              <p>Sign up to play our game.</p>
              <GreenBtn
                text="Sign In"
                onClick={toggleForm}
              />
            </div>
            <div className="toggle-panel toggle-right">
              <h3>Hello, Friend!</h3>
              <p>It’s nice to see you again.</p>
              <GreenBtn
                text="Sign Up"
                onClick={toggleForm}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
