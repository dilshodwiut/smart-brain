import React, { useState, useContext, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import styles from "./Navigation.module.css";
import hamStyles from "../UI/Hamburger/Hamburger.module.css";
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
        <nav className={`${styles.navbar} pa2`}>
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
            <nav
              className={`${styles.mobileNavbar} flex justify-center items-center flex-column flex-nowrap h-100 pa2`}
            >
              <NavLink
                to="/home"
                onClick={() => {
                  setHamIsActive(false);
                  document
                    .getElementById("hamburger")
                    .classList.toggle(hamStyles["is-active"]);
                }}
                className="f3 link dim white underline pa2 pa3-l pointer"
              >
                Home
              </NavLink>
              <NavLink
                to="/rankings"
                onClick={() => {
                  setHamIsActive(false);
                  document
                    .getElementById("hamburger")
                    .classList.toggle(hamStyles["is-active"]);
                }}
                className="f3 link dim white underline pa2 pa3-l pointer"
              >
                Rankings
              </NavLink>
              <NavLink
                to="/profile"
                onClick={() => {
                  setHamIsActive(false);
                  document
                    .getElementById("hamburger")
                    .classList.toggle(hamStyles["is-active"]);
                }}
                className="f3 link dim white underline pa2 pa3-l pointer"
              >
                Profile
              </NavLink>
              <NavLink
                to="/"
                onClick={() => {
                  setHamIsActive(false);
                  document
                    .getElementById("hamburger")
                    .classList.toggle(hamStyles["is-active"]);
                  signoutHandler();
                }}
                className="f3 link dim white underline pa2 pa3-l pointer"
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
        <nav className={`${styles.navbar} pa2`}>
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
            <nav
              className={`${styles.mobileNavbar} flex justify-center items-center flex-column flex-nowrap h-100 pa2`}
            >
              <NavLink
                to="/home"
                onClick={() => {
                  setHamIsActive(false);
                  document
                    .getElementById("hamburger")
                    .classList.toggle(hamStyles["is-active"]);
                }}
                className="f3 link dim white underline pa2 pa3-l pointer"
              >
                Home
              </NavLink>
              <NavLink
                to="/rankings"
                onClick={() => {
                  setHamIsActive(false);
                  document
                    .getElementById("hamburger")
                    .classList.toggle(hamStyles["is-active"]);
                }}
                className="f3 link dim white underline pa2 pa3-l pointer"
              >
                Rankings
              </NavLink>
              <NavLink
                to="/signin"
                onClick={() => {
                  setHamIsActive(false);
                  document
                    .getElementById("hamburger")
                    .classList.toggle(hamStyles["is-active"]);
                }}
                className="f3 link dim white underline pa2 pa3-l pointer"
              >
                Sign in
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => {
                  setHamIsActive(false);
                  document
                    .getElementById("hamburger")
                    .classList.toggle(hamStyles["is-active"]);
                }}
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

export default React.memo(Navigation);
