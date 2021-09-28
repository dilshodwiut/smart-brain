import classes from "./Hamburger.module.css";

export default function Hamburger() {
  const clickHandler = () => {
    document.getElementById("hamburger").classList.toggle(classes["is-active"]);
  };

  return (
    <button
      className={`${classes.hamburger} ${classes["hamburger--spin"]}`}
      type="button"
      onClick={clickHandler}
      id="hamburger"
    >
      <span className={`${classes["hamburger-box"]}`}>
        <span className={`${classes["hamburger-inner"]}`}></span>
      </span>
    </button>
  );
}
