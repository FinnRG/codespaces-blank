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
