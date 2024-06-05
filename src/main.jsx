import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import DataTable from "./components/DataTable/DataTable.jsx";
import DriverDetail from "./components/driverDetail.jsx";
import Login from "./pages/Login.jsx";
import Layout from "./pages/Layout.jsx";
import DashBoard from "./components/dashboard.jsx";
import Payment from "./components/payments";
import Rides from "./components/rides";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },

      {
        path: "/drivers",
        element: (
          <>
            <DataTable />
            {/* <Outlet /> */}
          </>
        ),
      },
      {
        path: "/drivers/:id",
        element: <DriverDetail />,
      },
      {
        path: "/payments",
        element: <Payment />,
      },
      {
        path: "/rides",
        element: <Rides />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
