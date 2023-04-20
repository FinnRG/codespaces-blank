import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homescreen from "./Challenges";
import ChallengeView from "./routes/ChallengeView";
import ChallengeProgress from "./routes/ChallengeProgress";

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
    {
      path: "/challenge/:id/progress",
      element: <ChallengeProgress />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
