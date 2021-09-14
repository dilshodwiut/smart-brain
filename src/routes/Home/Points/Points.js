import React, { useContext } from "react";
import { AuthContext } from "../../../context/auth-context";

const Points = (props) => {
  console.log("[Points] rendered");
  const authContext = useContext(AuthContext);

  return (
    <>
      <div className="white f3 tc">
        {authContext.isAuth
          ? `${authContext.credentials.username}, your current points:`
          : "Guest, you need to authenticate to have points!"}
      </div>
      <div className="white f1 tc mb3">
        {authContext.isAuth ? `#${props.points}` : null}
      </div>
    </>
  );
};

export default Points;
