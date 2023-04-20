import { Badge, Card, Group, Progress, Stack, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { StartedChallenge } from "../hooks/useUserData";
import { Challenge } from "../types";
import { useTranslation } from "react-i18next";

interface ChallengeProgressCardProps {
  challenge: Challenge;
  startedChallenge: StartedChallenge;
}

const ChallengeProgressCard = ({
  challenge,
  startedChallenge,
}: ChallengeProgressCardProps) => {
  const { t } = useTranslation();
  const progress =
    challenge.type === "todo" ? 0 : (startedChallenge.progress / 7) * 100;

  return (
    <Card
      component={Link}
      to={`/challenge/${challenge.index}/progress`}
      style={{ height: "100%" }}
      withBorder
      radius="md"
    >
      <Stack style={{ height: "inherit" }} justify="space-between">
        <div>
          {challenge.type === "weekly" && (
            <Group position="right">
              <Badge>{7 - startedChallenge.progress} days left</Badge>
            </Group>
          )}
          {challenge.type === "todo" && (
            <Group position="right">
              <Badge>TODO</Badge>
            </Group>
          )}
          <Text size="lg" weight={500} mt="md">
            {t(`challenge-${challenge.index}-title`)}
          </Text>
        </div>
        <div>
          <Text
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 5,
            }}
            color="dimmed"
            size="sm"
          >
            {" "}
            {t(`challenge-${challenge.index}-content`)}
          </Text>
          <Progress value={progress} mt={5} />
        </div>
      </Stack>
    </Card>
  );
};

export default ChallengeProgressCard;
