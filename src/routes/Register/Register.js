import { useState, useRef, useContext, useCallback, useEffect } from "react";
import { AuthContext } from "../../context/auth-context";
import { Link, useHistory } from "react-router-dom";
import Button from "../../components/UI/Button/Button";

function Register(props) {
  console.log("[Register] rendered");

  const authContext = useContext(AuthContext);

  useEffect(() => {
    document.title = props.title || "Smart Brain";

    fetch(
      "https://smart-brain-8a35a-default-rtdb.asia-southeast1.firebasedatabase.app/usernames.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setUsernames(Object.keys(data));
      });
  }, [props.title]);

  const [isLoading, setIsLoading] = useState(false);
  const [usernames, setUsernames] = useState(null);
  const [name, setName] = useState("");

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();

  let history = useHistory();

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();

      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enteredName = nameInputRef.current.value;

      // add validation

      setIsLoading(true);

      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJgVBuxrNjLa2VeYMY2I-_95ochdVZXzs",
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
            "https://smart-brain-8a35a-default-rtdb.asia-southeast1.firebasedatabase.app/usernames.json",
            {
              method: "PATCH",
              body: JSON.stringify({ [enteredName]: `${data.localId}` }),
              headers: { "Content-Type": "application/json" },
            }
          );
          fetch(
            "https://smart-brain-8a35a-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
            {
              method: "PATCH",
              body: JSON.stringify({
                [data.localId]: {
                  email: enteredEmail,
                  points: 0,
                  username: enteredName,
                },
              }),
              headers: { "Content-Type": "application/json" },
            }
          );

          const expirationTime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          authContext.login(
            data.idToken,
            expirationTime.toISOString(),
            data.localId
          );
          authContext.getCredentials({
            username: enteredName,
            points: 0,
            email: enteredEmail,
          });
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
            <legend className="f1 fw6 ph0 mh0 w-100 tc">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6 tc" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                ref={nameInputRef}
                onChange={nameChangeHandler}
              />
              {usernames && usernames.includes(name) && (
                <small
                  id="name-desc"
                  className="f6 black-60 db mb2 mt2"
                  style={{ color: "red" }}
                >{`${name} already exists`}</small>
              )}
              {usernames && !usernames.includes(name) && name.length >= 3 && (
                <small
                  id="name-desc"
                  className="f6 black-60 db mb2 mt2"
                  style={{ color: "green" }}
                >{`${name} is available`}</small>
              )}
            </div>
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
                Register
              </Button>
            )}
            {isLoading && <p>Sending request...</p>}
          </div>
          <div className="lh-copy mt3 tc">
            ALready have an account?
            <Link to="/signin" className="f6 link dim black db pointer">
              Signin
            </Link>
          </div>
        </form>
      </main>
    </article>
  );
}

export default Register;
