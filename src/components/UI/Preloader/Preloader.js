import styles from "./Preloader.module.css";

export default function Preloader(props) {
  return (
    <>
      <div className={styles.preloader}>Loading...</div>
      {props.children && <div className={styles.msg}>{props.children}</div>}
    </>
  );
}
