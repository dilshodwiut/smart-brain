import classes from "./Button.module.css";

export default function Button(props) {
  return (
    <button
      className={classes.Button}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
