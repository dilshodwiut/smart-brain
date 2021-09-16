import classes from "./Button.module.css";

export default function Button(props) {
  return <div className={classes.Button}>{props.children}</div>;
}
