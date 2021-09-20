import classes from "./Backdrop.module.css";

export default function Backdrop(props) {
  const styles = { position: "fixed", height: "100vh" };
  return (
    <div
      className={classes.Backdrop}
      onClick={props.onConfirm}
      style={props.coversFull ? styles : null}
    >
      {props.children}
    </div>
  );
}
