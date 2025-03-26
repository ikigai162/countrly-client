import React from "react";
import "./GreenBtn.css";

const GreenBtn = ({ text, onClick }) => {
  return <button onClick={onClick} id="GreenBtn" type="button" className="greenBtn">{text}</button>;
};

export default GreenBtn;