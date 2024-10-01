import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./AdminRouter";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
  // <AppRouter />
);
