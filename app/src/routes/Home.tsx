import { Container, Stack, Text } from "@mantine/core";
import Challenges from "../components/Challenges";
import { StatsRing } from "../components/StatsRing";
import useUserData from "../hooks/useUserData";
import {
  calculateLevel,
  calculatePoints,
  calculateProgress,
} from "../utils/calculateLevel";
import Tour from "reactour";
import { useState } from "react";

const Home = (): JSX.Element => {
  const { userData, setTourDone } = useUserData();
  const points = calculatePoints(userData);
  const [tourOpen, setTourOpen] = useState(!userData.tourDone);

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
      <Tour
        isOpen={tourOpen}
        onRequestClose={() => {
          setTourOpen(false);
          setTourDone();
        }}
        steps={[
          {
            selector: ".tour-step-1",
            content: (
              <Container>
                <Text>Welcome to Let's Science</Text>
              </Container>
            ),
          },
          {
            selector: ".tour-step-2",
            content: (
              <Container>
                <Text>Here challenges</Text>
              </Container>
            ),
          },
          {
            selector: ".tour-step-3",
            content: (
              <Container>
                <Text>Here challenge category. Click here</Text>
              </Container>
            ),
          },
          {
            selector: ".tour-step-4",
            content: (
              <Container>
                <Text>Here challenge. Click here</Text>
              </Container>
            ),
          },
        ]}
      />
    </Stack>
  );
};

export default Home;
