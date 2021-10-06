import React, { useState, useContext, useCallback, useEffect } from "react";
import { AuthContext } from "../../context/auth-context";
import { Link, useHistory } from "react-router-dom";
import Button from "../../components/UI/Button/Button";

function Register(props) {
  console.log("[Register] rendered");

  const authContext = useContext(AuthContext);

  const [usernames, setUsernames] = useState(null);
  const [emails, setEmails] = useState(undefined);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = props.title || "Smart Brain";

    fetch(
      "https://smart-brain-8a35a-default-rtdb.asia-southeast1.firebasedatabase.app/usernames.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setUsernames(Object.keys(data));
      });

    fetch(
      "https://smart-brain-8a35a-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
    )
      .then((res) => res.json())
      .then((data) => {
        let emails = [];
        for (const user in data) {
          emails.push(data[user].email);
        }
        setEmails(emails);
        if (typeof emails != "undefined" && emails.includes(email)) {
          setError((prevState) => ({
            ...prevState,
            email: "The user with this email has already registered",
          }));
        }
      });
  }, [props.title, email]);

  let history = useHistory();

  const nameChangeHandler = (e) => {
    const nameInput = e.target.value;
    setName(nameInput);
    if (usernames.includes(nameInput)) {
      setError((prevState) => ({
        ...prevState,
        name: `${nameInput} already exists`,
      }));
    } else {
      setError((prevState) => ({ ...prevState, name: null }));
    }
  };

  const emailChangeHandler = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
    if (!emailInput.includes("@")) {
      setError((prevState) => ({
        ...prevState,
        email: `${emailInput} is not valid`,
      }));
    } else if (typeof emails != "undefined" && emails.includes(emailInput)) {
      setError((prevState) => ({
        ...prevState,
        email: "The user with this email has already registered",
      }));
    } else {
      setError((prevState) => ({ ...prevState, email: null }));
    }
  };

  const passwordChangeHandler = (e) => {
    const passwordInput = e.target.value;
    setPassword(passwordInput);
    if (passwordInput.length >= 1 && passwordInput.length <= 5) {
      setError((prevState) => ({
        ...prevState,
        password: "This password is too weak",
      }));
    } else {
      setError((prevState) => ({ ...prevState, password: null }));
    }
  };

  const registerUser = useCallback(
    async function (url) {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setIsLoading(false);

      fetch(
        "https://smart-brain-8a35a-default-rtdb.asia-southeast1.firebasedatabase.app/usernames.json",
        {
          method: "PATCH",
          body: JSON.stringify({ [name]: `${data.localId}` }),
          headers: { "Content-Type": "application/json" },
        }
      );

      fetch(
        "https://smart-brain-8a35a-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
        {
          method: "PATCH",
          body: JSON.stringify({
            [data.localId]: {
              email: email,
              points: 0,
              username: name,
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
        username: name,
        points: 0,
        email: email,
      });

      history.replace("/home");
    },
    [authContext, history, name, email, password]
  );

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();

      // add validation
      if (name === "") {
        setError((prevState) => ({
          ...prevState,
          name: "This field cannot be empty",
        }));
        return;
      }
      if (email === "") {
        setError((prevState) => ({
          ...prevState,
          email: "This field cannot be empty",
        }));
        return;
      }
      if (password === "") {
        setError((prevState) => ({
          ...prevState,
          password: "This field cannot be empty",
        }));
        return;
      }

      setIsLoading(true);

      registerUser(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJgVBuxrNjLa2VeYMY2I-_95ochdVZXzs"
      );
    },
    [registerUser, email, name, password]
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
                onChange={nameChangeHandler}
              />
              {usernames && error.name && (
                <small
                  id="name-desc"
                  className="f6 black-60 db mb2 mt2"
                  style={{ color: "red" }}
                >
                  {error.name}
                </small>
              )}
              {usernames && !error.name && name.length >= 3 && (
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
                onChange={emailChangeHandler}
              />
              {error.email && email.length >= 6 && (
                <small
                  id="email-desc"
                  className="f6 black-60 db mb2 mt2"
                  style={{ color: "red" }}
                >
                  {error.email}
                </small>
              )}
              {!error.email && email.length >= 6 && (
                <small
                  id="email-desc"
                  className="f6 black-60 db mb2 mt2"
                  style={{ color: "green" }}
                >{`${email} is available`}</small>
              )}
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
                onChange={passwordChangeHandler}
              />
              {error.password && (
                <small
                  id="email-desc"
                  className="f6 black-60 db mb2 mt2"
                  style={{ color: "red" }}
                >
                  {error.password}
                </small>
              )}
              {!error.password && !!password.length && (
                <small
                  id="email-desc"
                  className="f6 black-60 db mb2 mt2"
                  style={{ color: "green" }}
                >
                  {"This password is strong"}
                </small>
              )}
            </div>
          </fieldset>
          <div className="tc">
            {!isLoading && (
              <Button
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                disabled={
                  typeof error.name === "string" ||
                  typeof error.email === "string" ||
                  typeof error.password === "string"
                    ? true
                    : false
                }
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

export default React.memo(Register);
