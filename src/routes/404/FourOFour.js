import { useEffect } from "react";

export default function FourOFour(props) {
  useEffect(() => {
    document.title = props.title || "Smart Brain";
  }, [props.title]);

  return (
    <section>
      <header className="tc ph5 lh-copy">
        <h1 className="f1 f-headline-l code mb3 fw9 dib tracked-tight light-purple">
          404
        </h1>
        <h2 className="tc f1-l fw1">
          Sorry, we can't find the page you are looking for.
        </h2>
      </header>
    </section>
  );
}
