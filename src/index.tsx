import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <>
        <App />
        <ToastContainer />
      </>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
