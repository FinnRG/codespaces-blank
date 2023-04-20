import { useLocalStorage } from "@mantine/hooks";

export type ChallengeCategory = "energy" | "water" | "waste" | "co2";

export interface CompletedChallenge {
  challengeId: number;
  dateStarted: Date;
  dateEnded: Date;
}

export interface StartedChallenge {
  challengeId: number;
  dateStarted: Date;
}

export interface Badge {
  category: ChallengeCategory;
  level: "bronze" | "silver" | "gold";
}

export interface UserData {
  name: string;
  points: number;
  preferredLanguage: string;
  completedChallenges: CompletedChallenge[];
  startedChallenges: StartedChallenge[];
  badges: Badge[];
}

interface UseUserDataResult {
  userData: UserData;
  setUserData: (val: UserData | ((prev: UserData) => UserData)) => void;
}

const useUserData = (): UseUserDataResult => {
  const [userData, setUserData] = useLocalStorage<UserData>({
    key: "letsscience-user-data",
    defaultValue: {
      name: "No Name",
      points: 0,
      preferredLanguage: "en",
      completedChallenges: [],
      startedChallenges: [],
      badges: [],
    },
  });

  return { userData, setUserData };
};

export default useUserData;
