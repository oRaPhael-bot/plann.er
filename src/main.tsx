// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// // import "./index.css";
// import { App } from "./app";
// import "./styles/tailwind.css";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app.tsx";
import "./styles/tailwind.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
