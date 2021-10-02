import React from "react";
import ParticlesBg from "particles-bg";

function Layout(props) {
  console.log("[Layout] rendered");
  return (
    <>
      <ParticlesBg color="#ffffff" type="cobweb" bg={true} />
      <main>{props.children}</main>
    </>
  );
}

export default React.memo(Layout);
