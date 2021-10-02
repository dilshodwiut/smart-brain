export default function Input(props) {
  return (
    <input
      className={props.className}
      type={props.type || "text"}
      value={props.value}
      name={props.name}
      id={props.id}
    />
  );
}
