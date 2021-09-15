import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

export const AuthContext = React.createContext({
  credentials: {
    username: "",
    points: "",
  },
  getCredentials: () => {},
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
  const storedCredentials = JSON.parse(localStorage.getItem("credentials"));

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("uid");
    localStorage.removeItem("credentials");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    uid: storedUid,
    credentials: storedCredentials,
  };
};

const AuthContextProvider = (props) => {
  const storedData = retrieveStoredData();
  let initialToken, initialUid, initialCredentials;
  if (storedData) {
    initialToken = storedData.token;
    initialUid = storedData.uid;
    initialCredentials = storedData.credentials;
  }
  const [token, setToken] = useState(initialToken);
  const [uid, setUid] = useState(initialUid);
  const [credentials, setCredentials] = useState(initialCredentials);

  const userIsLoggedIn = !!token;

  const getCredentials = useCallback((comingCredentials) => {
    if (comingCredentials.username) {
      setCredentials(comingCredentials);
      localStorage.setItem("credentials", JSON.stringify(comingCredentials));
    } else {
      setCredentials((prevCredentials) => {
        let newCredentials;
        if (prevCredentials === undefined) {
          newCredentials = {
            points: comingCredentials.points,
            email: "",
            username: "",
          };
        } else {
          newCredentials = {
            points: comingCredentials.points,
            email: prevCredentials.email,
            username: prevCredentials.username,
          };
        }
        localStorage.setItem("credentials", JSON.stringify(newCredentials));
        return newCredentials;
      });
    }
  }, []);

  const logoutHandler = useCallback(() => {
    setCredentials({});
    setToken(null);
    setUid(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("uid");
    localStorage.removeItem("credentials");

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
        credentials: credentials,
        token: token,
        uid: uid,
        isAuth: userIsLoggedIn,
        getCredentials: getCredentials,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
