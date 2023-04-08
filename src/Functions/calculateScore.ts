// Types
import { Card, CardValue } from 'types.d';

type CalculateScoreProps = {
  cards: Card[];
};

// Calculate the score of hand of cards
export function calculateScore(props: CalculateScoreProps): number {
  const { cards } = props;
  let score = 0;

  for (const card of cards) {
    // If the card is face down, skip it
    if (!card.faceUp) continue;

    if (card.value === CardValue.ACE) {
      // If the score is already over 10, the ace is worth 1
      if (score + 11 > 21) {
        score += 1;
        continue;
      } else {
        score += 11;
        continue;
      }
    }

    // Face cards are worth 10
    if (
      card.value === CardValue.QUEEN ||
      card.value === CardValue.KING ||
      card.value === CardValue.JACK
    ) {
      score += 10;
      continue;
    }

    score += card.value;
  }
  return score;
}
