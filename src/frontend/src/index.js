import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {Levels} from "./components/Levels";
import Level1 from "./components/Level1";
import { Dapp } from "./components/Dapp"
import { Faucet } from "./components/Faucet";
import Level2 from "./components/Level2";
import Level3 from "./components/Level3";
import Home from "./components/Home";
import TroubleShooting from "./components/TroubleShooting";



// We import bootstrap here, but you can remove if you want
import "bootstrap/dist/css/bootstrap.css";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Dapp />,
    children: [
      { index: true, element: <Home />},
      {
        path: "Level1",
        element: <Level1 />,
      },
      {
        path: "Level2",
        element: <Level2 />,
      },
      {
        path: "Level3",
        element: <Level3 />,
      },
      {
        path: "Faucet",
        element: <Faucet />
      },
      {
        path: "Troubleshooting",
        element: <TroubleShooting />
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));



root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
