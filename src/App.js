import React, { useContext, useCallback } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import Layout from "./hoc/Layout/Layout";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Auth from "./components/Auth";

export default function App() {
  console.log("[App] rendered");

  const authContext = useContext(AuthContext);
  let history = useHistory();

  const redirectHome = useCallback(() => {
    authContext.login();
    history.push("/home");
  }, [authContext, history]);

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
        <Route path="/home" component={Home} />
        <Route path="/" exact>
          {authContext.isAuth ? <Redirect to="/home" /> : <Auth />}
        </Route>
      </Switch>
    </Layout>
  );
}
