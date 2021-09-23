import React, { useContext, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import Layout from "./hoc/Layout/Layout";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Signin from "./routes/Signin/Signin";
import Register from "./routes/Register/Register";
import Rankings from "./routes/Rankings/Rankings";
import Profile from "./routes/Profile/Profile";
import Home from "./routes/Home/Home";
import Welcome from "./routes/Welcome/Welcome";
import classes from "./App.module.css";
import { spring, AnimatedSwitch } from "react-router-transition";
import FourOFour from "./routes/404/FourOFour";
import Snackbar from "./components/UI/Snackbar/Snackbar";

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

  const animationStyles = {
    marginRight: "-100%",
    animation: "slideout 1.2s 1",
  };

  const [state, setState] = useState(false);
  setTimeout(() => {
    setState(true);
  }, 5000);

  return (
    <Layout>
      <Navigation />
      <Logo />
      <Snackbar style={state ? animationStyles : null}>
        The app is still in development! Please excuse that!
      </Snackbar>
      <AnimatedSwitch
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
        className={classes["route-wrapper"]}
      >
        {/* React.Fragment doesn't work to wrap routes */}
        {!authContext.isAuth && [
          <Route
            path="/signin"
            key="/signin"
            render={(props) => <Signin title="Sign in" />}
          />,
          <Route
            path="/register"
            key="/register"
            render={(props) => <Register title="Register" />}
          />,
        ]}
        {authContext.isAuth && (
          <Route path="/profile">
            <Profile title="Profile" />
          </Route>
        )}
        <Route path="/rankings">
          <Rankings title="Rankings" />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/" exact>
          {authContext.isAuth ? (
            <Redirect to="/home" />
          ) : (
            <Welcome title="Welcome" />
          )}
        </Route>
        <Route path="*">
          {/* 404 page */}
          <FourOFour title="Page not found" />
        </Route>
      </AnimatedSwitch>
    </Layout>
  );
}
