import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App";
import { MarkersContextProvider } from "./context/MarkerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MarkersContextProvider>
      <App />
    </MarkersContextProvider>
  </React.StrictMode>
);
