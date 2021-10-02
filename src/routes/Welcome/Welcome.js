import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/UI/Button/Button";

function Welcome(props) {
  console.log("[Welcome] rendered");

  const history = useHistory();

  useEffect(() => {
    document.title = props.title || "Smart Brain";
  }, [props.title]);

  const clickHandler = () => {
    history.push("/home");
  };

  return (
    <section className="tc-l mt4 mt5-m mt6-l ph3">
      <header>
        <h1 className="f2 f1-l fw2 white-90 mb0 lh-title">
          Smart Brain &mdash; face detection app
        </h1>
        <h2 className="fw1 f3 white-80 mt3 mb4">
          Multiple face detections in a single image is supported!
        </h2>
      </header>
      <Button
        className="f6 no-underline grow dib v-mid bg-blue white ba b--blue ph3 pv2 mb3"
        onClick={clickHandler}
      >
        Visit as a guest
      </Button>
    </section>
  );
}

export default Welcome;
