import styles from "./ModalOverlay.module.css";
import Card from "../Card/Card";

export default function ModalOverlay(props) {
  return (
    <Card className={`${styles.modal} overflow-hidden fixed`}>
      <header className={`${styles.header} pa3`}>
        <h2 className="white ma0">{props.title}</h2>
      </header>
      <div className="pa3">
        <p>{props.message}</p>
      </div>
      <footer className="flex justify-end pa3">footer actions</footer>
    </Card>
  );
}
