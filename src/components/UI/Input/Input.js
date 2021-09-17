import classes from "./Input.module.css";

export default function Input(props) {
  return (
    <input
      className={`${props.className} ${classes.Input}`}
      type={props.type || "text"}
      value={props.value}
      name={props.name}
      id={props.id}
    />
  );
}
