import React from "react";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";


import LayoutHome from "@pages/Shared/Layout";
import Home from "@pages/Contents/Home";
import ErrorPage from "@pages/Contents/404";

const RoutersCst: React.FC = () => {

  const routes: RouteObject[] = [
    {
      path: "/",
      element: <LayoutHome />,
      errorElement: "",
      children: [
        {
          index: true,
          path: "",
          element: (
            <Home />
          ),
        },
      ],
    },
    {
      path: "*",
      errorElement: "",
      element: <ErrorPage />
    }
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default RoutersCst;
