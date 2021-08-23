import React, { useState } from "react";
import Rank from "./Rank/Rank";
import ImageLinkForm from "./ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./FaceRecognition/FaceRecognition";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "da83cb85013349cd9208ff3964b606f5",
});

function Home(props) {
  const [userInput, setUserInput] = useState("");
  const [submitState, setSubmitState] = useState(false);
  const [box, setBox] = useState({});

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
  return (
    <>
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        userInput={userInput}
      />
      {submitState && <FaceRecognition imageUrl={userInput} box={box} />}
    </>
  );
}

export default Home;
