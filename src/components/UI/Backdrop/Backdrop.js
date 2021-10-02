import styles from "./Backdrop.module.css";

export default function Backdrop(props) {
  const coversFullStyles = { position: "fixed", height: "100vh" };
  return (
    <div
      className={styles.backdrop.concat(
        " absolute top-0 left-0 w-100 h-100 bg-black o-80"
      )}
      onClick={props.onConfirm}
      style={props.coversFull ? coversFullStyles : null}
    >
      {props.children}
    </div>
  );
}
