import React from "react";
import classes from "./Navigation.module.css";

function Navigation({ onRouteChange, isSignedIn }) {
  if (isSignedIn) {
    return (
      <nav className={classes.Navbar}>
        <p
          className="f3 link dim black underline pa3 pointer"
          onClick={function () {
            onRouteChange("signin");
          }}
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav className={classes.Navbar}>
        <p
          className="f3 link dim black underline pa3 pointer"
          onClick={function () {
            onRouteChange("signin");
          }}
        >
          Sign In
        </p>
        <p
          className="f3 link dim black underline pa3 pointer"
          onClick={function () {
            onRouteChange("register");
          }}
        >
          Register
        </p>
      </nav>
    );
  }
}

export default Navigation;
