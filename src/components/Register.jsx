import  { useState } from "react";
import BlueBtn from "../constants/BlueBtn";
import GreenBtn from "../constants/GreenBtn";
import { icons } from "../img/constants";

import "./Register.css";

function Register() {
  const [isActive, setIsActive] = useState(false);

  const toggleForm = () => {
    setIsActive(!isActive);
  };

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
            <input type="email" placeholder="Username" />
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
                className="hidden"
                onClick={toggleForm}
              />
            </div>
            <div className="toggle-panel toggle-right">
              <h3>Hello, Friend!</h3>
              <p>It’s nice to see you again.</p>
              <GreenBtn
                text="Sign Up"
                className="hidden"
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
