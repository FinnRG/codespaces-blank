import { useLocalStorage } from "@mantine/hooks";
import SuperJSON from "superjson";

export type ChallengeCategory = "energy" | "water" | "waste" | "co2";

export interface CompletedChallenge {
  challengeId: number;
  dateStarted: Date;
  dateEnded: Date;
}

export interface StartedChallenge {
  challengeId: number;
  progress: number;
  dateStarted: Date;
  updatedAt?: Date;
}

export interface Badge {
  category: ChallengeCategory;
  level: "bronze" | "silver" | "gold";
}

export interface UserData {
  name: string;
  preferredLanguage: string;
  completedChallenges: CompletedChallenge[];
  startedChallenges: StartedChallenge[];
  tourDone: boolean;
  badges: Badge[];
  registeredAt: Date;
}

interface UseUserDataResult {
  userData: UserData;
  setUserData: (val: UserData | ((prev: UserData) => UserData)) => void;
  firstLogin: boolean;
  setTourDone: () => void;
}

const useUserData = (): UseUserDataResult => {
  const defaultValue = {
    name: "default_hidden_name",
    preferredLanguage: "en",
    completedChallenges: [],
    startedChallenges: [],
    tourDone: false,
    badges: [],
    registeredAt: new Date(),
  };

  const [userData, setUserData] = useLocalStorage<UserData>({
    key: "letsscience-user-data",
    defaultValue,
    getInitialValueInEffect: false,
    serialize: SuperJSON.stringify,
    deserialize: (str) =>
      str === undefined ? defaultValue : SuperJSON.parse(str),
  });

  const firstLogin = userData.name === defaultValue.name;

  const setTourDone = () => {
    setUserData((prev) => ({
      ...prev,
      tourDone: true,
    }));
  };

  return { userData, setUserData, firstLogin, setTourDone };
};

export default useUserData;
