import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FullLayout from "./layouts/FullLayout";
import 'bootstrap/dist/css/bootstrap.min.css';
import Error from "./layouts/Error";
import SpotifyDashboard from "./pages/Spotify/Dashboard";
import PokemonDashboard from "./pages/Pokemon/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FullLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "spotify",
        element: <SpotifyDashboard />
      },
      {
        path: "pokemon",
        element: <PokemonDashboard />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
