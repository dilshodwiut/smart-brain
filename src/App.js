import React, { useContext, useCallback } from "react";
import { Switch, Route } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import Layout from "./hoc/Layout/Layout";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Home from "./components/Home/Home";

export default function App() {
  console.log("[App] rendered");

  const authContext = useContext(AuthContext);

  const redirectHome = useCallback(() => {
    authContext.login();
  }, [authContext]);

  const redirectSignin = useCallback(() => {
    authContext.logout();
  }, [authContext]);

  return (
    <Layout>
      <Navigation
        isSignedIn={authContext.isAuth}
        redirectSignin={redirectSignin}
      />
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
    </Layout>
  );
}
