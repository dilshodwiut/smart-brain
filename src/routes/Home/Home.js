import React, { useState, useCallback, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import Clarifai from "clarifai";
import Points from "./Points/Points";
import ImageLinkForm from "./ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./FaceRecognition/FaceRecognition";

const app = new Clarifai.App({
  apiKey: "da83cb85013349cd9208ff3964b606f5",
});

function Home(props) {
  console.log("[Home] rendered");

  const authContext = useContext(AuthContext);

  const initialCount = authContext.isAuth
    ? authContext.credentials.points || 0
    : 0;
  const [counter, setCounter] = useState(initialCount);

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
      if (!insetBoxes.length) {
        app.models
          .predict(Clarifai.FACE_DETECT_MODEL, userInput)
          .then(function (res) {
            setInsetBoxes(calculateFaceLocation(res.outputs[0].data.regions));
            // add one point to the rank of this user in database if logged in
            authContext.getCredentials({ points: counter + 1 });
            fetch(
              "https://smart-brain-8a35a-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
              {
                method: "PATCH",
                body: JSON.stringify({
                  [authContext.uid]: {
                    points: authContext.credentials.points + 1,
                    email: authContext.credentials.email,
                    username: authContext.credentials.username,
                  },
                }),
                headers: { "Content-Type": "application/json" },
              }
            );
            setCounter(counter + 1);
          })
          .catch(function (err) {
            throw new Error("Error in getting api response", err);
          });
      }
    },
    [userInput, calculateFaceLocation, counter, insetBoxes.length, authContext]
  );

  return (
    <>
      <Points points={counter} />
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
