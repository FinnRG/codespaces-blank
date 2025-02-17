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
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Space,
} from "@mantine/core";
import { useEffect, useState } from "react";
import Stats from "./routes/Stats";
import { useTranslation } from "react-i18next";

const App = (): JSX.Element => {
  const { i18n } = useTranslation();
  const { firstLogin, userData } = useUserData();
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

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
    {
      path: "/stats",
      element: <Stats />,
    },
  ]);

  useEffect(() => {
    i18n.changeLanguage(userData.preferredLanguage);
  }, []);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Space h="xs" />
        <RouterProvider router={router} />;
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
