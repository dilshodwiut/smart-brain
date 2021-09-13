import React, { useState, useCallback, useEffect } from "react";
import Clarifai from "clarifai";
import Points from "./Points/Points";
import ImageLinkForm from "./ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./FaceRecognition/FaceRecognition";

const app = new Clarifai.App({
  apiKey: "da83cb85013349cd9208ff3964b606f5",
});

function Home(props) {
  console.log("[Home] rendered");

  useEffect(() => {
    document.title = props.title || "Smart Brain";
  }, [props.title]);

  const [userInput, setUserInput] = useState("");
  const [insetBoxes, setInsetBoxes] = useState([]);

  const inputChangeHandler = useCallback((e) => {
    setUserInput(e.target.value);
    setInsetBoxes([]);
  }, []);

  const calculateFaceLocation = useCallback(function (regions) {
    const boundingBoxes = regions.map((region) => {
      return region.region_info.bounding_box;
    });
    const image = document.getElementById("inputImage");
    const width = ++image.width;
    const height = ++image.height;
    const insetBoxes = boundingBoxes.map((boundingBox) => {
      return {
        leftCol: boundingBox.left_col * width,
        topRow: boundingBox.top_row * height,
        rightCol: width - boundingBox.right_col * width,
        bottomRow: height - boundingBox.bottom_row * height,
      };
    });
    return insetBoxes;
  }, []);

  const submitHandler = useCallback(
    function () {
      app.models
        .predict(Clarifai.FACE_DETECT_MODEL, userInput)
        .then(function (res) {
          setInsetBoxes(calculateFaceLocation(res.outputs[0].data.regions));
        })
        .catch(function (err) {
          throw new Error("Error in getting api response", err);
        });
      // add one point to the rank of this user in database if logged in
    },
    [userInput, calculateFaceLocation]
  );

  return (
    <>
      <Points />
      <ImageLinkForm
        userInput={userInput}
        onInputChange={inputChangeHandler}
        onSubmit={submitHandler}
      />
      {userInput && <FaceRecognition imageUrl={userInput} boxes={insetBoxes} />}
    </>
  );
}

export default Home;
