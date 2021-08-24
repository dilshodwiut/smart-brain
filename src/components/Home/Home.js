import React, { useState, useCallback, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import Auth from "../Auth";
import Rank from "./Rank/Rank";
import ImageLinkForm from "./ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./FaceRecognition/FaceRecognition";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "da83cb85013349cd9208ff3964b606f5",
});

function Home(props) {
  console.log("[Home] rendered");

  const authContext = useContext(AuthContext);

  let content = <Auth />;

  const [userInput, setUserInput] = useState("");
  const [box, setBox] = useState({});

  const onInputChange = useCallback((e) => {
    setUserInput(e.target.value);
  }, []);

  const calculateFaceLocation = useCallback(function (data) {
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
  }, []);

  const displayFaceBox = useCallback(function (box) {
    setBox(box);
  }, []);

  const onSubmit = useCallback(
    function () {
      app.models
        .predict(Clarifai.FACE_DETECT_MODEL, userInput)
        .then(function (res) {
          displayFaceBox(calculateFaceLocation(res));
        })
        .catch(function (err) {
          throw new Error("Error in getting api response", err);
        });
    },
    [userInput, displayFaceBox, calculateFaceLocation]
  );

  if (authContext.isAuth) {
    content = (
      <>
        <Rank />
        <ImageLinkForm
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          userInput={userInput}
        />
        {userInput && <FaceRecognition imageUrl={userInput} box={box} />}
      </>
    );
  }

  return content;
}

export default Home;
