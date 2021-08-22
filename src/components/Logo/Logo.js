import React from "react";
import classes from "./Logo.module.css";

function Logo(props) {
  return (
    <div
      className={"ma4 mt0 pa3 br2 shadow-2 Tilt ".concat(classes.Tilt)}
      style={{
        height: 150,
        width: 150,
        transformStyle: "preserve-3d",
        transform: "perspective(1000px)",
      }}
    >
      <img
        src="https://img.icons8.com/wired/100/000000/brain.png"
        alt="Brain"
        style={{ width: "100%", transform: "translateZ(20px)" }}
      />
    </div>
  );
}

export default Logo;
