import React from "react";
import { RouterProvider } from "react-router-dom";

import "./styles/index.css";
import router from "./routes";

const App = () => <RouterProvider router={router} />;

export default App;
