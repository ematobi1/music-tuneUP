import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AudioEngineProvider } from "./audio-engine/AudioEngineContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AudioEngineProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AudioEngineProvider>
  </React.StrictMode>
);
