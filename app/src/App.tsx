import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homescreen from "./Challenges";
import ChallengeView from "./routes/ChallengeView";

const App = (): JSX.Element => {
  const router = createBrowserRouter([
    {
      path: "/challenges",
      element: <Homescreen />,
    },
    {
      path: "/challenge/:id",
      element: <ChallengeView />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
