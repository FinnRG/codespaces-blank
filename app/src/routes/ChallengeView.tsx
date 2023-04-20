import {
  Link,
  Navigate,
  RouterProvider,
  useNavigate,
  useParams,
} from "react-router-dom";
import challenges from "../challenges.json";
import {
  Button,
  Group,
  Loader,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import useUserData from "../hooks/useUserData";
import { Challenge } from "../types";
import { useState } from "react";

function isNumeric(str: string | undefined) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str as unknown as number) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

const ChallengeView = (): JSX.Element => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { userData, setUserData } = useUserData();
  const [finished, setFinished] = useState<boolean>(false);

  if (id === undefined || !isNumeric(id) || parseInt(id) > challenges.length) {
    return <p>Invalid id</p>;
  }

  const parsedId = parseInt(id);
  const challenge = challenges[parsedId];

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
          },
        ],
      };
    });
  };
  console.log(userData);

  if (finished) {
    return <Navigate to="/challenges" />;
  }

  return (
    <Stack align="center">
      <Title>{t(`challenge-${parsedId}-title`)}</Title>
      <Text>{t(`challenge-${parsedId}-content`)}</Text>
      <Group position="right" mt="xl">
        <Button component={Link} to="/challenges" variant="outline">
          Go Back
        </Button>
        <Button onClick={() => startChallenge(challenge)}>
          Start Challenge
        </Button>
      </Group>
    </Stack>
  );
};

export default ChallengeView;
