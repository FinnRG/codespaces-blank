import { Accordion, Grid } from "@mantine/core";
import colorMap from "../utils/colorMap";
import challenges from "../challenges.json";
import ChallengeCard from "./ChallengeCard";
import { useListState } from "@mantine/hooks";
import { Challenge } from "../types";
import useUserData from "../hooks/useUserData";
import ChallengeProgressCard from "./ChallengeProgressCard";
import { useTranslation } from "react-i18next";

const getCategories = (challenges: Challenge[]) => {
  const l = [...new Set(challenges.flatMap((ch) => ch.category))];
  return l;
};

const Challenges = (): JSX.Element => {
  const { t } = useTranslation(["challenges", "common"]);
  const { userData } = useUserData();
  const [value, setValueHandlers] = useListState<string>(["My Challenges"]);
  const colors = colorMap(challenges);
  const categories = getCategories(challenges);

  return (
    <Accordion
      className={"tour-step-2"}
      multiple
      value={value}
      onChange={setValueHandlers.setState}
    >
      {userData.startedChallenges.length > 0 && (
        <Accordion.Item value="My Challenges">
          <Accordion.Control>
            {t("common:myChallenges").toUpperCase()}
          </Accordion.Control>
          <Accordion.Panel>
            <Grid>
              {userData.startedChallenges.map((ch, key) => (
                <Grid.Col span={6} key={key}>
                  <ChallengeProgressCard
                    startedChallenge={ch}
                    challenge={challenges[ch.challengeId - 1]}
                  />
                </Grid.Col>
              ))}
            </Grid>
          </Accordion.Panel>
        </Accordion.Item>
      )}
      {categories.map((category, key) => (
        <Accordion.Item
          className={key === 0 ? "tour-step-3" : ""}
          value={category}
          key={key}
        >
          <Accordion.Control>
            {t(category, { ns: "common" }).toUpperCase()}
          </Accordion.Control>
          <Accordion.Panel>
            <Grid>
              {challenges
                .filter((ch) => ch.category === category)
                .filter(
                  (ch) =>
                    userData.startedChallenges.filter(
                      (c) => c.challengeId === ch.index
                    ).length === 0
                )
                .map((ch, key) => (
                  <Grid.Col
                    className={
                      key === 0 && category === "water" ? "tour-step-4" : ""
                    }
                    span={6}
                    key={key}
                  >
                    <ChallengeCard challenge={ch} colorMap={colors} />
                  </Grid.Col>
                ))}
            </Grid>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default Challenges;
