// Types
import { Card, CardValue } from "types.d";

type CalculateScoreProps = {
  cards: Card[];
};

// Calculate the score of hand of cards
export function calculateScore(props: CalculateScoreProps): number {
  const { cards } = props;

  const score = cards
    .filter((card) => card.faceUp)
    .reduce((acc, card) => {
      if (card.value === CardValue.ACE) {
        return acc + (acc + 11 > 21 ? 1 : 11);
      }
      if (
        card.value === CardValue.JACK ||
        card.value === CardValue.QUEEN ||
        card.value === CardValue.KING
      ) {
        return acc + 10;
      }
      return acc + card.value;
    }, 0);

  return score;
}
