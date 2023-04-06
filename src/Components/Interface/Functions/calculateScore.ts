import { Card, CardValue } from "types.d";

type CalculateScoreProps = {
  oldScore: number;
  newCard: Card;
};

export function calculateScore(props: CalculateScoreProps) {
  const { oldScore, newCard } = props;
  let newScore = oldScore;
  if (!newCard.faceUp) return newScore;
  if (newCard.value === CardValue.ACE) {
    if (newScore + 11 > 21) {
      newScore += 1;
      return newScore;
    } else {
      newScore += 11;
      return newScore;
    }
  }
  newScore += newCard.value;

  return newScore;
}
