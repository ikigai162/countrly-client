import React from "react";
import { icons } from "../img/constants";

import "./Users.css";

function Users() {
  return (
    <>
      <div className="user-content">
          <div className="user-name">
            <img className="user-img" src={icons.baby} alt="icon" />
            <p className="user-text">User</p>
          </div>
          <p className="user-rank">1</p>
        </div>
        <div className="user-content">
          <div className="user-name">
            <img className="user-img" src={icons.teen} alt="icon" />
            <p className="user-text">User</p>
          </div>
          <p className="user-rank">2</p>
        </div>
        <div className="user-content">
          <div className="user-name">
            <img className="user-img" src={icons.mustafa} alt="icon" />
            <p className="user-text">User</p>
          </div>
          <p className="user-rank">3</p>
        </div>
        <div className="user-content">
          <div className="user-name">
            <img className="user-img" src={icons.baby} alt="icon" />
            <p className="user-text">User</p>
          </div>
          <p className="user-rank">4</p>
        </div>
        <div className="user-content">
          <div className="user-name">
            <img className="user-img" src={icons.teen} alt="icon" />
            <p className="user-text">User</p>
          </div>
          <p className="user-rank">5</p>
        </div>
        <div className="user-content">
          <div className="user-name">
            <img className="user-img" src={icons.mustafa} alt="icon" />
            <p className="user-text">User</p>
          </div>
          <p className="user-rank">6</p>
        </div>
    </>
  );
}

export default Users;
