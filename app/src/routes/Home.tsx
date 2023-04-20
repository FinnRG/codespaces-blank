import { Stack } from "@mantine/core";
import Challenges from "../components/Challenges";
import { StatsRing } from "../components/StatsRing";
import useUserData from "../hooks/useUserData";
import {
  calculateLevel,
  calculatePoints,
  calculateProgress,
} from "../utils/calculateLevel";

const Home = (): JSX.Element => {
  const { userData } = useUserData();
  const points = calculatePoints(userData);

  return (
    <Stack>
      <StatsRing
        data={[
          {
            label: "You are currently Level",
            stats: calculateLevel(points),
            progress: calculateProgress(points),
            color: "blue",
            icon: "up",
          },
        ]}
      />
      <Challenges />
    </Stack>
  );
};

export default Home;
