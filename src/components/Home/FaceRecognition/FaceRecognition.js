import React from "react";
import classes from "./FaceRecognition.module.css";

function FaceRecognition({ imageUrl, box }) {
  console.log("[FaceRecognition] rendered");
  return (
    <div className={"center shadow-5 ".concat(classes.FaceRecognition)}>
      <img
        className={classes.Image}
        id="inputImage"
        src={imageUrl}
        alt="Error"
      />
      {Object.entries(box).length ? (
        <div
          className={classes.Box}
          style={{
            position: "absolute",
            boxShadow: "0 0 0 3px #149df2 inset",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            cursor: "pointer",
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      ) : null}
    </div>
  );
}

export default FaceRecognition;
