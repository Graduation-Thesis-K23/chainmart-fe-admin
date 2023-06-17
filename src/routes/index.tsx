import React from "react";
import { createBrowserRouter } from "react-router-dom";

import {
  Dashboard,
  Products,
  Login,
  Employees,
  Orders,
  Suppliers,
  NotFound,
} from "~/components/pages";
import MainLayout from "~/components/layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <Dashboard />
      </MainLayout>
    ),
  },
  {
    path: "/products",
    element: (
      <MainLayout>
        <Products />
      </MainLayout>
    ),
  },
  {
    path: "/employees",
    element: (
      <MainLayout>
        <Employees />
      </MainLayout>
    ),
  },
  {
    path: "/orders",
    element: (
      <MainLayout>
        <Orders />
      </MainLayout>
    ),
  },
  {
    path: "/suppliers",
    element: (
      <MainLayout>
        <Suppliers />
      </MainLayout>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
