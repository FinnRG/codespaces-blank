import { Link, Navigate, useParams } from "react-router-dom";
import challenges from "../challenges.json";
import { Button, Container, Group, Stack, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import useUserData from "../hooks/useUserData";
import { Challenge } from "../types";
import { useState } from "react";
import { isNumeric } from "../utils/isNumeric";

const ChallengeView = (): JSX.Element => {
  const { t } = useTranslation(["challenges", "common"]);
  const { id } = useParams();
  const { userData, setUserData } = useUserData();
  const [finished, setFinished] = useState<boolean>(false);

  if (id === undefined || !isNumeric(id) || parseInt(id) > challenges.length) {
    return <p>Invalid id</p>;
  }

  const parsedId = parseInt(id);
  const challenge = challenges[parsedId - 1];

  const startChallenge = (challenge: Challenge) => {
    setUserData((prev) => {
      if (
        userData.startedChallenges.find(
          (ch) => ch.challengeId === challenge.index
        ) !== undefined
      ) {
        return prev;
      }
      setFinished(true);
      return {
        ...prev,
        startedChallenges: [
          ...prev.startedChallenges,
          {
            challengeId: challenge.index,
            dateStarted: new Date(),
            progress: 0,
          },
        ],
      };
    });
  };

  if (finished) {
    return <Navigate to="/challenges" />;
  }

  return (
    <Container>
      <Stack align="center">
        <Title>{t(`challenge-${parsedId}-title`)}</Title>
        <Text>{t(`challenge-${parsedId}-content`)}</Text>
        <Group position="right" mt="xl">
          <Button component={Link} to="/challenges" variant="outline">
            {t("common:back")}
          </Button>
          <Button onClick={() => startChallenge(challenge)}>
            {t("common:startChallenge")}
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default ChallengeView;
