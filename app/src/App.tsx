import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./routes/Home";
import ChallengeView from "./routes/ChallengeView";
import ChallengeProgress from "./routes/ChallengeProgress";
import useUserData from "./hooks/useUserData";
import Login from "./routes/Login";

const App = (): JSX.Element => {
  const { firstLogin } = useUserData();
  const router = createBrowserRouter([
    {
      path: "/challenges",
      element: <Home />,
    },
    {
      path: "/challenge/:id",
      element: <ChallengeView />,
    },
    {
      path: "/challenge/:id/progress",
      element: <ChallengeProgress />,
    },
    {
      path: "/",
      element: firstLogin ? (
        <Navigate to="/login" />
      ) : (
        <Navigate to="/challenges" />
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
