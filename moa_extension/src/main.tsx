import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import "./styles/tokens.css";
import "./styles/fonts.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode> 
);
