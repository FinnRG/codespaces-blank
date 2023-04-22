import {
  Stack,
  Title,
  Text,
  Button,
  Group,
  Alert,
  Container,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import useUserData, { StartedChallenge } from "../hooks/useUserData";
import { Challenge } from "../types";
import { isNumeric } from "../utils/isNumeric";
import challenges from "../challenges.json";
import { useTranslation } from "react-i18next";
import { IconAlertCircle } from "@tabler/icons-react";
import confetti from "canvas-confetti";

const oneDayAgo = (date: Date): boolean => {
  const day = 1000 * 60 * 60 * 24;
  const dayAgo = Date.now() - day;

  // @ts-ignore
  return date > dayAgo;
};

const showFireworks = () => {
  var count = 200;
  var defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio: number, opts: object) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

const ChallengeProgress = () => {
  const { userData, setUserData } = useUserData();
  const { id } = useParams();
  const { t } = useTranslation(["challenges", "common"]);
  const parsedId =
    id === undefined || !isNumeric(id) || parseInt(id) > challenges.length
      ? 1
      : parseInt(id);
  const [challengeProgress, setChallengeProgress] = useState<
    StartedChallenge | undefined
  >(undefined);
  const parsedProgress = challengeProgress?.progress ?? 0;
  const [challenge] = useState<Challenge>(challenges[parsedId - 1]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [challengeDone, setChallengeDone] = useState<boolean>(false);

  const isChallengeDone = (): boolean =>
    challenge.type === "todo" ? parsedProgress > 0 : parsedProgress >= 7;

  useEffect(() => {
    setChallengeProgress(
      userData.startedChallenges.find((ch) => ch.challengeId == parsedId)
    );

    if (!challengeDone) {
      setChallengeDone(isChallengeDone());
    }
  }, [userData]);

  const addProgress = (progress: number) => {
    setUserData((prev) => {
      const startedChallenges = prev.startedChallenges.map((ch) => {
        if (ch.challengeId === parsedId) {
          const newChallengeProgress = {
            ...ch,
            updatedAt: new Date(),
            progress: ch.progress + progress,
          };
          setChallengeProgress(newChallengeProgress);
          return newChallengeProgress;
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
    setSubmitted(true);
  };

  useEffect(() => {
    if (challengeDone) {
      showFireworks();
      setUserData((prev) => {
        const startedChallenges = prev.startedChallenges.filter(
          (ch) => ch.challengeId !== challengeProgress?.challengeId
        );
        const completedChallenges = [
          ...prev.completedChallenges,
          {
            challengeId: challengeProgress!.challengeId,
            dateStarted: challengeProgress!.dateStarted,
            dateEnded: new Date(),
          },
        ];
        return {
          ...prev,
          startedChallenges,
          completedChallenges,
        };
      });
    }
  }, [challengeDone]);

  if (!challengeDone && !isChallengeDone() && submitted) {
    return <Navigate to="/challenges" />;
  }

  const updated_at = new Date(
    challengeProgress?.updatedAt ?? new Date(1995, 11, 17, 3, 24, 0)
  );
  const showChallengeAlert =
    challenge.type === "weekly" && oneDayAgo(updated_at);

  if (challengeDone) {
    return (
      <Container>
        <Stack align="center">
          <Title>{t("common:challengeCompleted")}</Title>
          <Text>
            {t("common:challengeCompletedText", {
              challengeTitle: t(`challenge-${challenge.index}-title`),
              pointCount: challenge.points,
            })}
          </Text>
          <Stack>
            <Group position="right" mt="xl">
              <Button color="green" component={Link} to="/challenges">
                {t("common:done")}
              </Button>
            </Group>
          </Stack>
        </Stack>
      </Container>
    );
  }

  return (
    <Container>
      <Stack align="center">
        <Title>{t(`challenge-${challenge.index}-title`)}</Title>
        <Text>{t(`challenge-${challenge.index}-content`)}</Text>
        {showChallengeAlert && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title={t("common:challengeAlreadyDoneTitle")}
          >
            {t("common:challengeAlreadyDoneText")}
          </Alert>
        )}
        <Stack>
          <Group position="right" mt="xl">
            <Button component={Link} to="/challenges" variant="outline">
              {t("common:back")}
            </Button>
            <Button color="red" onClick={() => cancelProgress()}>
              {t("common:cancelChallenge")}
            </Button>
          </Group>
          {challenge.type === "todo" && (
            <Button onClick={() => addProgress(1)}>Done</Button>
          )}
          {challenge.type === "weekly" && !showChallengeAlert && (
            <Button onClick={() => addProgress(1)}>
              {t("common:addProgress")}
            </Button>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default ChallengeProgress;
