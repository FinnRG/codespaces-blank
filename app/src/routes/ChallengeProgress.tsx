import { Stack, Title, Text, Button, Group, Alert } from "@mantine/core";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import useUserData, { StartedChallenge } from "../hooks/useUserData";
import { Challenge } from "../types";
import { isNumeric } from "../utils/isNumeric";
import challenges from "../challenges.json";
import { useTranslation } from "react-i18next";
import { IconAlertCircle } from "@tabler/icons-react";

const oneDayAgo = (date: Date): boolean => {
  const day = 1000 * 60 * 60 * 24;
  const dayAgo = Date.now() - day;

  // @ts-ignore
  return date > dayAgo;
};

const ChallengeProgress = () => {
  const { userData, setUserData } = useUserData();
  const { id } = useParams();
  const { t } = useTranslation();
  const parsedId =
    id === undefined || !isNumeric(id) || parseInt(id) > challenges.length
      ? 1
      : parseInt(id);
  const [challengeProgress, setChallengeProgress] = useState<
    StartedChallenge | undefined
  >(undefined);
  const [challenge] = useState<Challenge>(challenges[parsedId - 1]);
  const [submitted, setSubmitted] = useState(false);

  if (id === undefined) {
    return <Navigate to="/challenges" />;
  }

  useEffect(() => {
    setChallengeProgress(
      userData.startedChallenges.find((ch) => ch.challengeId == parsedId)
    );
  }, [userData]);

  const addProgress = (progress: number) => {
    setUserData((prev) => {
      const startedChallenges = prev.startedChallenges.map((ch) => {
        if (ch.challengeId === parsedId) {
          return {
            ...ch,
            updatedAt: new Date(),
            progress: ch.progress + progress,
          };
        }
        return ch;
      });
      return {
        ...prev,
        startedChallenges,
      };
    });
    setSubmitted(true);
  };

  const cancelProgress = () => {
    setUserData((prev) => {
      const startedChallenges = prev.startedChallenges.filter(
        (ch) => ch.challengeId !== parsedId
      );
      return {
        ...prev,
        startedChallenges: startedChallenges,
      };
    });
  };

  if (submitted) {
    return <Navigate to="/challenges" />;
  }

  const updated_at = new Date(
    challengeProgress?.updatedAt ?? new Date(1995, 11, 17, 3, 24, 0)
  );
  const showChallengeAlert =
    challenge.type === "weekly" && oneDayAgo(updated_at);

  return (
    <Stack align="center">
      <Title>{t(`challenge-${challenge.index}-title`)}</Title>
      <Text>{t(`challenge-${challenge.index}-content`)}</Text>
      {showChallengeAlert && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Can't submit progress today"
        >
          This challenge has already been completed today. Come back tomorrow!
        </Alert>
      )}
      <Stack>
        <Group position="right" mt="xl">
          <Button component={Link} to="/challenges" variant="outline">
            Go Back
          </Button>
          <Button color="red" onClick={() => cancelProgress()}>
            Cancel Challenge
          </Button>
        </Group>
        {challenge.type === "todo" && (
          <Button onClick={() => addProgress(1)}>Add Progress</Button>
        )}
        {challenge.type === "weekly" && !showChallengeAlert && (
          <Button onClick={() => addProgress(1)}>Add Progress</Button>
        )}
      </Stack>
    </Stack>
  );
};

export default ChallengeProgress;
