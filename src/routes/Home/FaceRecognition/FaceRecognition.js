import React from "react";
import classes from "./FaceRecognition.module.css";

function FaceRecognition({ imageUrl, boxes }) {
  console.log("[FaceRecognition] rendered");

  let insetBoxes = [];

  if (boxes.length) {
    insetBoxes = boxes.map((box, index) => {
      return (
        <div
          key={index}
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
      );
    });
  }

  return (
    <div className={"center shadow-5 ".concat(classes.FaceRecognition)}>
      <img
        className={classes.Image}
        id="inputImage"
        src={imageUrl}
        alt="Error"
      />
      {insetBoxes === [] ? null : insetBoxes}
    </div>
  );
}

export default FaceRecognition;