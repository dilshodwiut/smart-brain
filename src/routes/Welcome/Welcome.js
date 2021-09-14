import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

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
    <div className="tc-l mt4 mt5-m mt6-l ph3">
      <h1 className="f2 f1-l fw2 white-90 mb0 lh-title">
        Magic Brain &mdash; face detection app
      </h1>
      <h2 className="fw1 f3 white-80 mt3 mb4">
        Multiple face detections in a single image is supported!
      </h2>
      <button
        className="f6 no-underline grow dib v-mid bg-blue white ba b--blue ph3 pv2 mb3"
        onClick={clickHandler}
      >
        Visit as a guest
      </button>
      {/* <span className="dib v-mid ph3 white-70 mb3">or</span>
        <a
          className="f6 no-underline grow dib v-mid white ba b--white ph3 pv2 mb3"
          href="index.html"
        >
          Secondary call to action
        </a> */}
    </div>
  );
}

export default Welcome;
