import React, { useContext } from "react";
import { AuthContext } from "../../../context/auth-context";

const Rank = React.memo(() => {
  console.log("[Rank] rendered");
  const authContext = useContext(AuthContext);

  return (
    <>
      <div className="white f3 tc">
        {authContext.isAuth
          ? `${authContext.credentials.username}, your current points:`
          : "Guest, you need to authenticate to have a rank!"}
      </div>
      <div className="white f1 tc mb3">
        {authContext.isAuth ? `#${authContext.credentials.points}` : null}
      </div>
    </>
  );
});

export default Rank;
