import React from "react";
import classes from "./FaceRecognition.module.css";

function FaceRecognition({ imageUrl, box }) {
  return (
    <div className={"center shadow-5 ".concat(classes.FaceRecognition)}>
      <img
        className={classes.Image}
        id="inputImage"
        src={imageUrl}
        alt="Error"
      />
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
    </div>
  );
}

export default FaceRecognition;
