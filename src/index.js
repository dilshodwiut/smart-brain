import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "tachyons";
import VanillaTilt from "vanilla-tilt";
import AuthContextProvider from "./context/auth-context";
import { BrowserRouter as Router } from "react-router-dom";
import Clarifai from "clarifai";

export const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFAI_API_KEY,
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

VanillaTilt.init(document.querySelector(".tilt"), {
  max: 30,
  scale: 1.1,
  glare: true,
  "max-glare": 0.8,
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
