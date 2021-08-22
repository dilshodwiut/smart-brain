import React from "react";

function FaceRecognition({ imageUrl, box }) {
  return (
    <div
      className="center shadow-5"
      style={{ width: "500px", margin: "16px auto", position: "relative" }}
    >
      <img
        id="inputImage"
        src={imageUrl}
        alt="Error"
        stlye={{ width: "100%", height: "auto" }}
      />
      <div
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
