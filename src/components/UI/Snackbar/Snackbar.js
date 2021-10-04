import React from "react";
import styles from "./Snackbar.module.css";

function Snackbar(props) {
  return (
    <div
      className={`${styles.snackbar} fixed white tc shadow-3 right-0 br2 br--bottom pa3`}
      style={props.style}
    >
      {props.children}
    </div>
  );
}

export default React.memo(Snackbar);
