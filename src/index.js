import { StrictMode } from "react";
import ReactDOM from "react-dom";

// import App from "./App";
import HookApp from "./HookApp";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <HookApp />
  </StrictMode>,
  rootElement
);
