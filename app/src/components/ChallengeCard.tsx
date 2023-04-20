import { Badge, Card, Group, Spoiler, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Challenge } from "../types";
import Logo from "./Logo";

interface ChallengeCardProps {
  challenge: Challenge;
  colorMap: Record<string, string>;
}

const ChallengeCard = ({ challenge, colorMap }: ChallengeCardProps) => {
  const { t } = useTranslation();
  return (
    <Card
      withBorder
      radius="md"
      component={Link}
      to={`/challenge/${challenge.index}`}
    >
      <Group position="apart">
        <Logo />
        <Badge color={colorMap[challenge.category]}>{challenge.category}</Badge>
      </Group>
      <Text size="lg" weight={500} mt="md">
        {t(`challenge-${challenge.index}-title`)}
      </Text>
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
        {t(`challenge-${challenge.index}-content`)}
      </Text>
    </Card>
  );
};

export default ChallengeCard;
