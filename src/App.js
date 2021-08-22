import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import classes from "./App.module.css";
import ParticlesBg from "particles-bg";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

const app = new Clarifai.App({
  apiKey: "da83cb85013349cd9208ff3964b606f5",
});

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [submitState, setSubmitState] = useState(false);
  const [box, setBox] = useState({});
  const [isSignedIn, setIsSignedIn] = useState(true);

  function onInputChange(e) {
    setUserInput(e.target.value);
    setSubmitState(false);
  }

  function onSubmit() {
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, userInput)
      .then(function (res) {
        displayFaceBox(calculateFaceLocation(res));
      })
      .catch(function (err) {
        throw new Error("Error in getting api response", err);
      });
    setSubmitState(true);
  }

  function calculateFaceLocation(data) {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = ++image.width;
    const height = ++image.height;
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  }

  function displayFaceBox(box) {
    setBox(box);
  }

  function redirectHome() {
    setIsSignedIn(true);
  }

  function redirectSignin() {
    setIsSignedIn(false);
  }

  return (
    <Router>
      <div className={classes.App}>
        <ParticlesBg
          color="#ffffff"
          type="cobweb"
          bg={true}
          className={classes.Particles}
        />
        <Navigation isSignedIn={isSignedIn} redirectSignin={redirectSignin} />
        <Logo />
        <Switch>
          <Route path="/signin">
            <Signin redirectHome={redirectHome} />
          </Route>
          <Route path="/register">
            <Register redirectHome={redirectHome} />
          </Route>
          <Route path="/">
            <React.Fragment>
              <Rank />
              <ImageLinkForm
                onInputChange={onInputChange}
                onSubmit={onSubmit}
                userInput={userInput}
              />
              {submitState && (
                <FaceRecognition imageUrl={userInput} box={box} />
              )}
            </React.Fragment>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
