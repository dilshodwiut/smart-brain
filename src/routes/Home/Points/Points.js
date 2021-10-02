import React, { useContext } from "react";
import { AuthContext } from "../../../context/auth-context";

const Points = () => {
  console.log("[Points] rendered");
  const authContext = useContext(AuthContext);

  return (
    <>
      <div className="white f3 tc mb3-l mb0-ns mb2-m mt2-m mt0 pa4-m pa2">
        {authContext.isAuth
          ? `${authContext.credentials.username}, your current points:`
          : "Guest, you need to authenticate to have points!"}
      </div>
      {authContext.isAuth ? (
        <div className="white f1 tc mb5-l mb3-m mb2 mt2-m mt0">
          {authContext.credentials.points}
        </div>
      ) : null}
    </>
  );
};

export default React.memo(Points);
