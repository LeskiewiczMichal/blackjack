import { Card, CardValue } from "types.d";
import { areInitialCards } from "./areInitialCards";

type HasBlackJackProps = {
  cards: Card[];
};

// Check if the cards are exactly one ace and one figure
export function hasBlackJack(props: HasBlackJackProps): boolean {
  const { cards } = props;

  if (!areInitialCards({ cards })) {
    return false;
  }

  const hasAce = cards.some((card) => card.value === CardValue.ACE);
  const hasFigure = cards.some((card) =>
    [CardValue.JACK, CardValue.QUEEN, CardValue.KING].includes(card.value),
  );

  if (hasAce && hasFigure) {
    return true;
  }
  return false;
}
