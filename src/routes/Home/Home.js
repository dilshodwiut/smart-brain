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

  useEffect(() => {
    if (
      authContext.isAuth &&
      authContext.credentials &&
      authContext.credentials.points
    ) {
      setCounter(authContext.credentials.points);
    }
  }, [authContext.credentials, authContext.isAuth]);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    document.title = props.title || "Smart Brain";
  }, [props.title]);

  const [userInput, setUserInput] = useState("");
  const [insetBoxes, setInsetBoxes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  // useEffect(() => {
  //   setIsLoading(true);
  // }, []);

  const submitHandler = useCallback(
    function () {
      if (!insetBoxes.length) {
        setIsLoading(true);
        app.models
          .predict(Clarifai.FACE_DETECT_MODEL, userInput)
          .then(function (res) {
            const regions = res.outputs[0].data.regions;
            setInsetBoxes(calculateFaceLocation(regions));
            if (authContext.isAuth) {
              authContext.getCredentials({ points: counter + regions.length });
            }
            setIsLoading(false);
            // fetch without .then() returns promise and function stops
            fetch(
              "https://smart-brain-8a35a-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
              {
                method: "PATCH",
                body: JSON.stringify({
                  [authContext.uid]: {
                    points: authContext.credentials.points + regions.length,
                    email: authContext.credentials.email,
                    username: authContext.credentials.username,
                  },
                }),
                headers: { "Content-Type": "application/json" },
              }
            );
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
      {userInput && (
        <FaceRecognition
          imageUrl={userInput}
          boxes={insetBoxes}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

export default Home;
