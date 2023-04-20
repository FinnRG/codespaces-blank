import { UserData } from "../hooks/useUserData";
import challenges from "../challenges.json";

export const calculateLevel = (score: number) => {
  // return Math.floor(0.1*(-5+Math.sqrt(5)*Math.sqrt(5+8*score)))
  return Math.floor(score / 5) + 1;
};

export const calculateProgress = (score: number) => {
  if (score % 5 === 0) {
    return 0;
  }
  return 100 - 100 * ((Math.ceil(score / 5) * 5 - score) / 5);
};

export const calculatePoints = (userData: UserData): number => {
  return userData.completedChallenges
    .map((ch) => challenges[ch.challengeId - 1].points)
    .reduce((prev, curr) => prev + curr, 0);
};
