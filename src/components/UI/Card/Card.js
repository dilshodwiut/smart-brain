export default function Card(props) {
  return (
    <div className={`${props.className} bg-white br-3 shadow-3`}>
      {props.children}
    </div>
  );
}
