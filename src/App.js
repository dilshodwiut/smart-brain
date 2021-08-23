import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(true);

  function redirectHome() {
    setIsSignedIn(true);
  }

  function redirectSignin() {
    setIsSignedIn(false);
  }

  return (
    <Layout>
      <Router>
        <Navigation isSignedIn={isSignedIn} redirectSignin={redirectSignin} />
        <Logo />
        <Switch>
          <Route path="/signin">
            <Signin redirectHome={redirectHome} />
          </Route>
          <Route path="/register">
            <Register redirectHome={redirectHome} />
          </Route>
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    </Layout>
  );
}
