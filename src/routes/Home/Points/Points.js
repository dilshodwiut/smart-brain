import React, { useContext } from "react";
import { AuthContext } from "../../../context/auth-context";

const Points = (props) => {
  console.log("[Points] rendered");
  const authContext = useContext(AuthContext);

  let username;

  if (authContext.credentials.username) {
    username = authContext.credentials.username;
  } else {
    username = "";
  }

  return (
    <>
      <div className="white f3 tc">
        {authContext.isAuth
          ? `${username}, your current points:`
          : "Guest, you need to authenticate to have points!"}
      </div>
      <div className="white f1 tc mb3">
        {authContext.isAuth ? `#${props.points}` : null}
      </div>
    </>
  );
};

export default Points;
