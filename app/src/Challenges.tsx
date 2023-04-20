import { Accordion,  Grid  } from "@mantine/core";
import colorMap from "./utils/colorMap";
import challenges from "./challenges.json";
import ChallengeCard from "./components/ChallengeCard";
import { useListState } from "@mantine/hooks";
import { Challenge } from "./types";

const getCategories = (challenges: Challenge[]) => {
  const l = [...new Set(challenges.flatMap((ch) => ch.category))];
  return l;
};


const Homescreen = (): JSX.Element => {

  const [value, setValueHandlers] = useListState<string>([])
  const colors = colorMap(challenges);
  const categories = getCategories(challenges)
  
  console.log(categories)

  return <Accordion  multiple value={value} onChange={setValueHandlers.setState}>
    {categories.map((category, key) => (
      <Accordion.Item value={category} key={key}>
        <Accordion.Control>{category.toUpperCase()}</Accordion.Control>
        <Accordion.Panel>
          <Grid>
            {challenges
              .filter(ch => ch.category === category)
              .map((ch, key) => (
                <Grid.Col span={6} key={key}>
                  <ChallengeCard challenge={ch} colorMap={colors} />
                </Grid.Col>
              ))}
          </Grid>
        </Accordion.Panel>
      </Accordion.Item>
    ))}
  </Accordion>
 ;
};

export default Homescreen;
