import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "../app/store.js";
import AnimatedApp from "./AnimatedApp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AnimatedApp />
    </Provider>
  </StrictMode>
);
