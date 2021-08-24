import React, { useContext } from "react";
import { AuthContext } from "../context/auth-context";

function Auth(props) {
  const authContext = useContext(AuthContext);
  const loginHandler = () => {
    authContext.login();
  };

  return (
    <div className="tc-l mt2 mt3-m mt4-l ph3">
      <h1 className="f2 f1-l fw2 white-90 mb0 lh-title">
        This Magic Brain will detect faces in your pictures
      </h1>
      <h2 className="fw1 f3 white-80 mt3 mb4">
        Image urls that include only one person supported for now
      </h2>
      <button
        className="f6 no-underline grow dib v-mid bg-blue white ba b--blue ph3 pv2 mb3"
        onClick={loginHandler}
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

export default Auth;
