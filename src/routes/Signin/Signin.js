import React, {
  useState,
  useRef,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { AuthContext } from "../../context/auth-context";
import { Link, useHistory } from "react-router-dom";
import Button from "../../components/UI/Button/Button";

function Signin(props) {
  console.log("[Signin] rendered");

  const authContext = useContext(AuthContext);

  useEffect(() => {
    document.title = props.title || "Smart Brain";
  }, [props.title]);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  let history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();

      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      // add validation

      setIsLoading(true);

      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJgVBuxrNjLa2VeYMY2I-_95ochdVZXzs",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            console.log("res is ok", res);
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed successfully!";
              if (data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              // show an error modal
              console.log("failed in res is not ok", data, errorMessage);
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data);
          fetch(
            `https://smart-brain-8a35a-default-rtdb.asia-southeast1.firebasedatabase.app/users/${data.localId}.json`
          )
            .then((res2) => res2.json())
            .then((data2) => {
              authContext.getCredentials(data2);
            });
          const expirationTime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          authContext.login(
            data.idToken,
            expirationTime.toISOString(),
            data.localId
          );
          authContext.getCredentials({ username: "", email: "", points: 0 });
          history.replace("/home");
        })
        .catch((err) => console.log("failed in catch", err));
    },
    [authContext, history]
  );

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-60-m w-40-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure" onSubmit={submitHandler}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0 w-100 tc">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6 tc" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                ref={emailInputRef}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6 tc" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                ref={passwordInputRef}
              />
            </div>
          </fieldset>
          <div className="tc">
            {!isLoading && (
              <Button
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
              >
                Sign in
              </Button>
            )}
            {isLoading && <p>Sending request...</p>}
          </div>
          <div className="lh-copy mt3 tc">
            New User?
            <Link to="/register" className="f6 link dim black db pointer">
              Register
            </Link>
          </div>
        </form>
      </main>
    </article>
  );
}

export default React.memo(Signin);
