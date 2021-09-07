import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import Layout from "./hoc/Layout/Layout";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Rankings from "./components/Rankings/Rankings";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import Welcome from "./components/Welcome";
import classes from "./App.module.css";
import { spring, AnimatedSwitch } from "react-router-transition";
import FourOFour from "./components/404/FourOFour";

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

  return (
    <Layout>
      <Navigation />
      <Logo />
      <AnimatedSwitch
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
        className={classes["route-wrapper"]}
      >
        {/* React.Fragment doesn't work to wrap routes */}
        {!authContext.isAuth && [
          <Route path="/signin" key="/signin">
            <Signin />
          </Route>,
          <Route path="/register" key="/register">
            <Register />
          </Route>,
        ]}
        {authContext.isAuth && <Route path="/profile" component={Profile} />}
        <Route path="/rankings" component={Rankings} />
        <Route path="/home" component={Home} />
        <Route path="/" exact>
          {authContext.isAuth ? <Redirect to="/home" /> : <Welcome />}
        </Route>
        <Route path="*">
          {/* 404 page */}
          <FourOFour />
        </Route>
      </AnimatedSwitch>
    </Layout>
  );
}
