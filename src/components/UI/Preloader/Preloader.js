import classes from "./Preloader.module.css";

export default function Preloader(props) {
  return (
    <>
      <div className={classes.Preloader}>Loading...</div>
      {props.children && <div className={classes.Msg}>{props.children}</div>}
    </>
  );
}
