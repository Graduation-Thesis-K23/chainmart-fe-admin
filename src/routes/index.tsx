import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Home from "../pages";
import Login from "../pages/login";
import Settings from "../pages/settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
