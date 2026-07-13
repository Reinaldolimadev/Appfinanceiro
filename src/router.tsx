import { createBrowserRouter } from "react-router-dom";

import { RootLayout } from "./components/layout/RootLayout";

import { SimulationResultsPage } from "./pages/SimulationResultsPage";
import { SimulationFormPage } from "./pages/SimulationFormPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <SimulationFormPage />,
      },
      {
        path: "/resultado/:id",
        element: <SimulationResultsPage />,
      },
      {
        path: "/historico",
        element: <SimulationResultsPage/>,
      },
    ],
  },
]);
