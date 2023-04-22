import { Button, Flex, Space, Stack, Text, Title } from "@mantine/core";
import useUserData from "../hooks/useUserData";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import { calculatePoints } from "../utils/calculateLevel";
import { useTranslation } from "react-i18next";

interface InfoTextProps {
  label: React.ReactNode;
  content: React.ReactNode;
}

const InfoText = (props: InfoTextProps) => (
  <Flex gap="xs">
    <Text weight={700}>{props.label}</Text>
    <Text>{props.content}</Text>
  </Flex>
);

const Stats = () => {
  const { t } = useTranslation(["common", "statistics"]);
  const { userData } = useUserData();

  const challengesCompleted = userData.completedChallenges.length;
  const totalPoints = calculatePoints(userData);

  return (
    <Stack align="center">
      <Title order={2}>
        {t("statistics:statistics")} - {userData.name}
      </Title>
      <Stack align="right">
        <InfoText
          label={t("statistics:registered").toString() + ":"}
          content={formatDate(userData.registeredAt)}
        />
        <InfoText
          label={t("statistics:totalPoints").toString() + ":"}
          content={totalPoints}
        />
        <InfoText
          label={t("statistics:challengesCompleted").toString() + ":"}
          content={challengesCompleted}
        />
      </Stack>
      <Space h="xs" />
      <Button component={Link} to="/challenges">
        {t("back")}
      </Button>
    </Stack>
  );
};

export default Stats;
