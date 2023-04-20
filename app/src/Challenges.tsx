import { Stack } from "@mantine/core";
import colorMap from "./utils/colorMap";
import challenges from "./challenges.json";
import ChallengeCard from "./components/ChallengeCard";

const Homescreen = (): JSX.Element => {
  const map = colorMap(challenges);

  const challengeCards = challenges.map((challenge, key) => (
    <ChallengeCard challenge={challenge} colorMap={map} key={key} />
  ));

  return <Stack align="center">{challengeCards}</Stack>;
};

export default Homescreen;
