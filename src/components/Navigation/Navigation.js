import React, { useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import classes from "./Navigation.module.css";

function Navigation() {
  console.log("[Navigation] rendered");

  const authContext = useContext(AuthContext);

  const signoutHandler = useCallback(() => {
    authContext.logout();
    // optional: redirect the user here
  }, [authContext]);

  const Rankings = (
    <Link
      to="/rankings"
      className="f3 link dim black underline pa2 pa3-l pointer"
    >
      Rankings
    </Link>
  );

  const Profile = (
    <Link
      to="/profile"
      className="f3 link dim black underline pa2 pa3-l poiner"
    >
      Profile
    </Link>
  );

  const Home = (
    <Link to="/home" className="f3 link dim black underline pa2 pa3-l pointer">
      Home
    </Link>
  );

  if (authContext.isAuth) {
    return (
      <nav className={classes.Navbar}>
        {Rankings} {Profile} {Home}
        <Link
          to="/"
          className="f3 link dim black underline pa2 pa3-l pointer"
          onClick={signoutHandler}
        >
          Sign Out
        </Link>
      </nav>
    );
  } else {
    return (
      <nav className={classes.Navbar}>
        {Rankings} {Home}
        <Link
          to="/signin"
          className="f3 link dim black underline pa2 pa3-l pointer"
        >
          Sign in
        </Link>
        <Link
          to="/register"
          className="f3 link dim black underline pa2 pa3-l pointer"
        >
          Register
        </Link>
      </nav>
    );
  }
}

export default Navigation;
