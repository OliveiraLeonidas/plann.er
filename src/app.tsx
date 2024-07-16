import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateTripPage } from "./pages/create-trip";
import { TripDetailsPage } from "./pages/trip-details";
//TODO refatorar e redistribuir as páginas
const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />,
  },
  {
    path: "/trips/:tripId",
    element: <TripDetailsPage />,
  },
  {
    path: "/trips/:tripId/confirm/:participantId",
    element: <TripDetailsPage />,
  },

  {
    path: "/trips/:tripId/confirmation",
    element: <TripDetailsPage />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
