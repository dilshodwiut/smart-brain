import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

export const AuthContext = React.createContext({
  token: "",
  uid: "",
  isAuth: false,
  login: (token, expirationTime) => {},
  logout: () => {},
});

// helper functions
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredData = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expiresAt");
  const storedUid = localStorage.getItem("uid");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    uid: storedUid,
  };
};

const AuthContextProvider = (props) => {
  const storedData = retrieveStoredData();
  let initialToken, initialUid;
  if (storedData) {
    initialToken = storedData.token;
  }
  const [token, setToken] = useState(initialToken);
  const [uid, setUid] = useState(initialUid);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUid(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("uid");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = useCallback(
    (token, expirationTime, uid) => {
      setToken(token);
      setUid(uid);
      localStorage.setItem("token", token);
      localStorage.setItem("expiresAt", expirationTime);
      localStorage.setItem("uid", uid);

      const remainingTime = calculateRemainingTime(expirationTime);

      logoutTimer = setTimeout(logoutHandler, remainingTime);
    },
    [logoutHandler]
  );

  useEffect(() => {
    if (storedData) {
      logoutTimer = setTimeout(logoutHandler, storedData.duration);
    }
  }, [storedData, logoutHandler]);

  return (
    <AuthContext.Provider
      value={{
        token: token,
        uid: uid,
        isAuth: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
