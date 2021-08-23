import React from "react";
import classes from "./Logo.module.css";

const Logo = React.memo(() => {
  console.log("[Logo] rendered");
  return (
    <div className={"ma4 mt0 pa3 br2 shadow-2 Tilt ".concat(classes.Tilt)}>
      <img
        className={classes.Logo}
        src="https://img.icons8.com/wired/100/000000/brain.png"
        alt="Brain"
      />
    </div>
  );
});

export default Logo;
