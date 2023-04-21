import { Button, Flex, Space, Stack, Text, Title } from "@mantine/core";
import useUserData from "../hooks/useUserData";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import { calculatePoints } from "../utils/calculateLevel";

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
  const { userData } = useUserData();

  const challengesCompleted = userData.completedChallenges.length;
  const totalPoints = calculatePoints(userData);

  return (
    <Stack align="center">
      <Title order={2}>Statistics - {userData.name}</Title>
      <Stack align="right">
        <InfoText
          label={"Registered:"}
          content={formatDate(userData.registeredAt)}
        />
        <InfoText label="Total points earned" content={totalPoints} />
        <InfoText label="Challenges completed:" content={challengesCompleted} />
      </Stack>
      <Space h="xs" />
      <Button component={Link} to="/challenges">
        Back
      </Button>
    </Stack>
  );
};

export default Stats;
