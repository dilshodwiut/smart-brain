import React from "react";
import styles from "./ImageLinkForm.module.css";
import Button from "../../../components/UI/Button/Button";

function ImageLinkForm({ userInput, onInputChange, onSubmit }) {
  console.log("[ImageLinkForm] rendered");

  return (
    <>
      <p className="f3 tc mb3-l mb0-ns mb2-m pa4-m pa2">
        {"This Magic Brain will detect faces in your pictures. Give it a try."}
      </p>
      <section className="center">
        <div
          className={"pa4-l pa4-m pa3 br3 shadow-5 center w-90 mw7 ".concat(
            styles.form
          )}
        >
          <input
            className="f4 pa2 w-70 center input-reset bn"
            type="text"
            placeholder="URL of an image..."
            value={userInput}
            onChange={onInputChange}
          />
          <Button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onSubmit}
          >
            Detect
          </Button>
        </div>
      </section>
    </>
  );
}

export default React.memo(ImageLinkForm);
