import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/auth-context";

const Rank = React.memo(() => {
  console.log("[Rank] rendered");
  const authContext = useContext(AuthContext);

  const [username, setUsername] = useState(null);
  const [rank, setRank] = useState(null);

  useEffect(() => {
    if (authContext.isAuth) {
      fetch(
        `https://smart-brain-8a35a-default-rtdb.asia-southeast1.firebasedatabase.app/users/${authContext.uid}.json`
      )
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setRank(data.rank);
          setUsername(data.username);
        })
        .catch((err) => console.log(err));
    }
  }, [authContext.isAuth, authContext.uid]);

  return (
    <>
      <div className="white f3 tc">
        {authContext.isAuth
          ? `${username}, your current rank is ...`
          : "Guest, you need to authenticate to have a rank!"}
      </div>
      <div className="white f1 tc mb3">
        {authContext.isAuth ? `#${rank}` : null}
      </div>
    </>
  );
});

export default Rank;
