import classes from "./ModalOverlay.module.css";
import Card from "../Card/Card";
import Button from "../Button/Button";

export default function ModalOverlay(props) {
  return (
    <Card className={classes.Modal}>
      <header className={classes.Header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.Content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.Actions}>
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </Card>
  );
}
