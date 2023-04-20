import { useLocalStorage } from "@mantine/hooks"

export type ChallengeCategory = "energy" | "water" | "waste" | "co2";

export interface CompletedChallenge {
    challengeId: number,
    dateStarted: Date,
    dateEnded: Date,
}

export interface StartedChallenge {
    challengeId: number,
    dateStarted: Date
}

export interface Badge {
    category: ChallengeCategory,
    level: "bronze" | "silver" | "gold"
}

export interface UserData {
    name: string,
    preferredLanguage: string,
    completedChallenges: CompletedChallenge[],
    badges: Badge[]
}

const useUserData = () => {
    const [userData, setUserData] = useLocalStorage({
        key: "letsscience-user-data"
    })
}

export default useUserData