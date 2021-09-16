import { useEffect } from "react";

export default function Profile(props) {
  useEffect(() => {
    document.title = props.title || "Smart Brain";
  }, [props.title]);

  return (
    <section style={{ textAlign: "center" }}>
      <h1 style={{ fontSize: "5rem" }}>🙇🏻‍♂️</h1>
      <p>
        Profile page with full of useful features is to be constructed in the
        near future. Please, excuse that!
      </p>
    </section>
  );
}
