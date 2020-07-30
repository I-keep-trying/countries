import React from "react";

const Button = ({ onClick, text }) => (
  <div>
    <button onClick={onClick}>{text}</button>
  </div>
)

export default Button;