import React from "react";
import classes from "./Layout.module.css";
import ParticlesBg from "particles-bg";

function Layout(props) {
  console.log("[Layout] rendered");
  return (
    <>
      <ParticlesBg
        color="#ffffff"
        type="cobweb"
        bg={true}
        className={classes.Particles}
      />
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
