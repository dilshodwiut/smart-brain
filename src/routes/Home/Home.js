import { useState, useCallback, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import Clarifai from "clarifai";
import Points from "./Points/Points";
import ImageLinkForm from "./ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./FaceRecognition/FaceRecognition";
import calculateFaceLocation from "../../helpers/calculateFaceLocation";

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
    setIsLoading(false);
  }, []);

  const submitHandler = useCallback(
    function () {
      if (userInput.trim() === "") {
        return;
      }
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
    [userInput, counter, insetBoxes.length, authContext]
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
