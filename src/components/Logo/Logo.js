import React from "react";
import styles from "./Logo.module.css";
import logo from "../../assets/brain.png";

const Logo = React.memo(() => {
  console.log("[Logo] rendered");
  return (
    <div className={"ma4 mt0 pa3 br2 shadow-2 tilt ".concat(styles.tilt)}>
      <img className={styles.logo} src={logo} alt="Brain" />
    </div>
  );
});

export default Logo;
