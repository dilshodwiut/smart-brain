import classes from "./Backdrop.module.css";

export default function Backdrop(props) {
  return <div className={classes.Backdrop}>{props.children}</div>;
}
