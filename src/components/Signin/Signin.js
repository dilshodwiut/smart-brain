import React from "react";
import { Link } from "react-router-dom";

function Signin({ redirectHome }) {
  console.log("[Signin] rendered");
  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0 w-100 tc">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6 tc" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6 tc" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <div className="tc">
            <Link to="/">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                // onClick={props.history.push("/")}
                onClick={redirectHome}
              />
            </Link>
          </div>
          <div className="lh-copy mt3 tc">
            <Link to="/register" className="f6 link dim black db pointer">
              Register
            </Link>
          </div>
        </form>
      </main>
    </article>
  );
}

export default Signin;
