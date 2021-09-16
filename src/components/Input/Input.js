import classes from "./Input.module.css";

export default function Input(props) {
  return <div className={classes.Input}>{props.children}</div>;
}
