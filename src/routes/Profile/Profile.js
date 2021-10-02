import { useEffect } from "react";

export default function Profile(props) {
  console.log("[Profile] rendered");
  useEffect(() => {
    document.title = props.title || "Smart Brain";
  }, [props.title]);

  return (
    <section className="tc">
      <h1 className="f-subheadline">🙇🏻‍♂️</h1>
      <p>
        Profile page with full of useful features is to be constructed in the
        near future. Please, excuse that!
      </p>
    </section>
  );
}
