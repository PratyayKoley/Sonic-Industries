import { rewards } from "../config/spins";

export const pickWeightedReward = (): string => {
  const index = Math.floor(Math.random() * rewards.length);
  return rewards[index].name;
};
