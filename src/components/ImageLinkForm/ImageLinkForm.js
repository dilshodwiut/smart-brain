import React from "react";
import classes from "./ImageLinkForm.module.css";

function ImageLinkForm({ onInputChange, onSubmit, userInput }) {
  return (
    <>
      <p className="f3">
        {"This Magic Brain will detect faces in your pictures. Give it a try."}
      </p>
      <div className="center">
        <div className={"pa4 br3 shadow-5 center ".concat(classes.Form)}>
          <input
            className="f4 pa2 w-70 center input-reset ba"
            type="text"
            placeholder="URL of an image..."
            value={userInput}
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </>
  );
}

export default ImageLinkForm;
