import React, { useContext, useCallback } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import Layout from "./hoc/Layout/Layout";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Auth from "./components/Auth";
import classes from "./App.module.css";
import { spring, AnimatedSwitch } from "react-router-transition";

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}

// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};

export default function App() {
  console.log("[App] rendered");

  const authContext = useContext(AuthContext);
  let history = useHistory();

  const signinHandler = useCallback(
    (e) => {
      e.preventDefault();
      authContext.login();
      history.push("/home");
    },
    [authContext, history]
  );

  const registerHandler = useCallback(
    (e) => {
      e.preventDefault();
      authContext.login();
      history.push("/home");
    },
    [authContext, history]
  );

  const signoutHandler = useCallback(() => {
    authContext.logout();
  }, [authContext]);

  return (
    <Layout>
      <Navigation isSignedIn={authContext.isAuth} onSignout={signoutHandler} />
      <Logo />
      <AnimatedSwitch
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
        className={classes["route-wrapper"]}
      >
        <Route path="/signin">
          <Signin onSignin={signinHandler} />
        </Route>
        <Route path="/register">
          <Register onRegister={registerHandler} />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/" exact>
          {authContext.isAuth ? <Redirect to="/home" /> : <Auth />}
        </Route>
      </AnimatedSwitch>
    </Layout>
  );
}
