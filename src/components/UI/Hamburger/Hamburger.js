import styles from "./Hamburger.module.css";

export default function Hamburger(props) {
  const clickHandler = () => {
    document.getElementById("hamburger").classList.toggle(styles["is-active"]);
    props.onActive((prevState) => !prevState);
  };

  return (
    <button
      className={`${styles.hamburger} ${styles["hamburger--spin"]}`}
      type="button"
      onClick={clickHandler}
      id="hamburger"
    >
      <span className={`${styles["hamburger-box"]}`}>
        <span className={`${styles["hamburger-inner"]}`}></span>
      </span>
    </button>
  );
}
