import React, { useState, useContext, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import classes from "./Navigation.module.css";
import Hamburger from "../UI/Hamburger/Hamburger";
import Backdrop from "../UI/Backdrop/Backdrop";

function Navigation() {
  console.log("[Navigation] rendered");

  const authContext = useContext(AuthContext);

  const signoutHandler = useCallback(() => {
    authContext.logout();
    // optional: redirect the user here
  }, [authContext]);

  const [hamIsActive, setHamIsActive] = useState(false);

  if (authContext.isAuth) {
    return (
      <>
        <Hamburger onActive={setHamIsActive} />
        <nav className={`${classes.Navbar} pa2`}>
          <NavLink
            to="/home"
            className="f3 link dim black underline pa2 pa3-l pointer"
          >
            Home
          </NavLink>
          <NavLink
            to="/rankings"
            className="f3 link dim black underline pa2 pa3-l pointer"
          >
            Rankings
          </NavLink>
          <NavLink
            to="/profile"
            className="f3 link dim black underline pa2 pa3-l poiner"
          >
            Profile
          </NavLink>
          <NavLink
            to="/"
            className="f3 link dim black underline pa2 pa3-l pointer"
            onClick={signoutHandler}
          >
            Sign Out
          </NavLink>
        </nav>
        {hamIsActive && (
          <Backdrop coversFull>
            <nav className={`${classes.MobileNavbar} pa2`}>
              <NavLink
                to="/home"
                className="f3 link dim white underline pa2 pa3-l pointer"
              >
                Home
              </NavLink>
              <NavLink
                to="/rankings"
                className="f3 link dim white underline pa2 pa3-l pointer"
              >
                Rankings
              </NavLink>
              <NavLink
                to="/profile"
                className="f3 link dim white underline pa2 pa3-l poiner"
              >
                Profile
              </NavLink>
              <NavLink
                to="/"
                className="f3 link dim white underline pa2 pa3-l pointer"
                onClick={signoutHandler}
              >
                Sign Out
              </NavLink>
            </nav>
          </Backdrop>
        )}
      </>
    );
  } else {
    return (
      <>
        <Hamburger onActive={setHamIsActive} />
        <nav className={classes.Navbar.concat(" pa2")}>
          <NavLink
            to="/home"
            className="f3 link dim black underline pa2 pa3-l pointer"
          >
            Home
          </NavLink>
          <NavLink
            to="/rankings"
            className="f3 link dim black underline pa2 pa3-l pointer"
          >
            Rankings
          </NavLink>
          <NavLink
            to="/signin"
            className="f3 link dim black underline pa2 pa3-l pointer"
          >
            Sign in
          </NavLink>
          <NavLink
            to="/register"
            className="f3 link dim black underline pa2 pa3-l pointer"
          >
            Register
          </NavLink>
        </nav>
        {hamIsActive && (
          <Backdrop coversFull>
            <nav className={classes.MobileNavbar.concat(" pa2")}>
              <NavLink
                to="/home"
                className="f3 link dim white underline pa2 pa3-l pointer"
              >
                Home
              </NavLink>
              <NavLink
                to="/rankings"
                className="f3 link dim white underline pa2 pa3-l pointer"
              >
                Rankings
              </NavLink>
              <NavLink
                to="/signin"
                className="f3 link dim white underline pa2 pa3-l pointer"
              >
                Sign in
              </NavLink>
              <NavLink
                to="/register"
                className="f3 link dim white underline pa2 pa3-l pointer"
              >
                Register
              </NavLink>
            </nav>
          </Backdrop>
        )}
      </>
    );
  }
}

export default Navigation;
