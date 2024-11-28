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
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

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
      setResponseMessage(response.data.message || "Success!");
    } catch (error: any) {
      console.error("Error:", error);
      const message =
        error.response?.data?.message || "A apărut o eroare. Încercați din nou.";
      setResponseMessage(message);
    }
  };

  return (
    <>
      <img className="logo-register" src={icons.logo} alt="Logo" />
      <div className={`container ${isActive ? "active" : ""}`} id="container">
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

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h3>Welcome Back!</h3>
              <p>Sign up to play our game.</p>
              <GreenBtn text="Sign In" onClick={toggleForm} />
            </div>
            <div className="toggle-panel toggle-right">
              <h3>Hello, Friend!</h3>
              <p>It’s nice to see you again.</p>
              <GreenBtn text="Sign Up" onClick={toggleForm} />
            </div>
          </div>
        </div>
      </div>

      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </>
  );
}

export default Register;
