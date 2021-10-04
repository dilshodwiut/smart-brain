import React from "react";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import Preloader from "../../../components/UI/Preloader/Preloader";

function FaceRecognition({ imageUrl, boxes, isLoading }) {
  console.log("[FaceRecognition] rendered");

  let insetBoxes = [];

  if (boxes.length) {
    insetBoxes = boxes.map((box, index) => {
      return (
        <div
          key={index}
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
    <div className="center shadow-5 relative mv3 w-70 mw6">
      <img
        className="w-100 h-auto"
        id="inputImage"
        src={imageUrl}
        alt="Error. Could't get the img from link"
      />
      {isLoading ? (
        <Backdrop>
          <Preloader />
        </Backdrop>
      ) : null}
      {insetBoxes === [] ? null : insetBoxes}
    </div>
  );
}

export default React.memo(FaceRecognition);
