import React from "react";

const Rank = React.memo(() => {
  console.log("[Rank] rendered");
  return (
    <>
      <div className="white f3 tc">{"Dilshod, your current rank is ..."}</div>
      <div className="white f1 tc mb3">{"#5"}</div>
    </>
  );
});

export default Rank;
