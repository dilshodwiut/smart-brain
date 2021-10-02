export default function Button(props) {
  return (
    <button
      className={props.className}
      type={props.type || "button"}
      onClick={props.onClick}
      {...props}
    >
      {props.children}
    </button>
  );
}
