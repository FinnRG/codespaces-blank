import { Container, Grid, Stack, Text } from "@mantine/core";
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
import Card from "../components/Card";
import { IconGraph, IconUser } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

const Home = (): JSX.Element => {
  const { t } = useTranslation("common");
  const { userData, setTourDone } = useUserData();
  const points = calculatePoints(userData);
  const [tourOpen, setTourOpen] = useState(!userData.tourDone);
  const [tourStep, setTourStep] = useState<number | null>(null);

  return (
    <Stack px="xs">
      <Grid>
        <Grid.Col span={12}>
          <Card>
            <StatsRing
              data={[
                {
                  label: t("currentLevel"),
                  stats: calculateLevel(points),
                  progress: calculateProgress(points),
                  color: "blue",
                  icon: "up",
                },
              ]}
            />
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          <Card bg="red" to="/login">
            <Stack pt="xs" align="center">
              <IconUser color="red" />
              <Text>{t("changeProfile")}</Text>
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          <Card bg="green" to="/stats">
            <Stack pt="xs" align="center">
              <IconGraph color="green" />
              <Text>{t("challengeHistory")}</Text>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
      <Challenges waterOpen={tourStep === 3} />
      <Tour
        isOpen={tourOpen}
        onRequestClose={() => {
          setTourOpen(false);
          setTourDone();
        }}
        getCurrentStep={(step) => setTourStep(step)}
        steps={[
          {
            selector: ".tour-step-1",
            content: (
              <Container>
                <Text>
                  Welcome to the Let's Science App. Let's start with a quick
                  tour of the app!
                </Text>
              </Container>
            ),
          },
          {
            selector: ".tour-step-2",
            content: (
              <Container>
                <Text>
                  Here is a list of the challenges that are currently available
                  to you.
                </Text>
              </Container>
            ),
          },
          {
            selector: ".tour-step-3",
            content: (
              <Container>
                <Text>
                  All challenges are grouped into categories. This makes it
                  easier for you to navigate through them and helps you choose
                  the category you want to contribute to the most. Click on a
                  category to see all the challenges.
                </Text>
              </Container>
            ),
          },
          {
            selector: ".tour-step-4",
            resizeObservables: [".tour-step-4"],
            content: (
              <Container>
                <Text>This is a challenge. Click on it to find out more.</Text>
              </Container>
            ),
          },
        ]}
      />
    </Stack>
  );
};

export default Home;
