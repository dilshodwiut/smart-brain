import classes from "./Snackbar.module.css";

export default function Snackbar(props) {
  return <div className={classes.Snackbar}>{props.children}</div>;
}
