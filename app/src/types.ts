export interface Challenge {
  index: number;
  points: number;
  difficulty: string;
  category: string;
  type: "weekly" | "todo" | string
}
