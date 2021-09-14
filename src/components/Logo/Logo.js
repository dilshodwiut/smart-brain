import React from "react";
import classes from "./Logo.module.css";
import logo from "../../assets/brain.png";

const Logo = React.memo(() => {
  console.log("[Logo] rendered");
  return (
    <div className={"ma4 mt0 pa3 br2 shadow-2 Tilt ".concat(classes.Tilt)}>
      <img className={classes.Logo} src={logo} alt="Brain" />
    </div>
  );
});

export default Logo;
