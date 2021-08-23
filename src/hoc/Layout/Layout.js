import React from "react";
import classes from "./Layout.module.css";
import ParticlesBg from "particles-bg";

export default function Layout(props) {
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
