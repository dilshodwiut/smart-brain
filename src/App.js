import React, { useState } from "react";
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

function App() {
  const [userInput, setUserInput] = useState("");
  const [submitState, setSubmitState] = useState(false);
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);

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

  function onRouteChange(route) {
    if (route === "signout") {
      setIsSignedIn(false);
    } else if (route === "home") {
      setIsSignedIn(true);
    } else if (route === "signin") {
      setIsSignedIn(false);
    }
    setRoute(route);
  }

  return (
    <div className={classes.App}>
      <ParticlesBg
        color="#ffffff"
        type="cobweb"
        bg={true}
        className={classes.Particles}
      />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      <Logo />
      {route === "home" ? (
        <React.Fragment>
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            userInput={userInput}
          />
        </React.Fragment>
      ) : route === "signin" ? (
        <Signin onRouteChange={onRouteChange} />
      ) : (
        <Register onRouteChange={onRouteChange} />
      )}
      {submitState && <FaceRecognition imageUrl={userInput} box={box} />}
    </div>
  );
}

export default App;
