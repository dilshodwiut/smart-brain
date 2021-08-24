import React from "react";
import { Link } from "react-router-dom";
import classes from "./Navigation.module.css";

function Navigation({ isSignedIn, redirectSignin }) {
  console.log("[Navigation] rendered");

  const Ranking = (
    <Link to="/rank" className="f3 link dim black underline pa3 pointer">
      Ranking
    </Link>
  );

  if (isSignedIn) {
    return (
      <nav className={classes.Navbar}>
        {Ranking}
        <Link
          to="/signin"
          className="f3 link dim black underline pa3 pointer"
          onClick={redirectSignin}
        >
          Sign Out
        </Link>
      </nav>
    );
  } else {
    return (
      <nav className={classes.Navbar}>
        {Ranking}
        <Link to="/signin" className="f3 link dim black underline pa3 pointer">
          Sign in
        </Link>
        <Link
          to="/register"
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </Link>
      </nav>
    );
  }
}

export default Navigation;
