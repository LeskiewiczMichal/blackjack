import { Card, CardValue } from "types.d";
import { areInitialCards } from "./areInitialCards";

type OnlyAceVisibleProps = {
  cards: Card[];
};

// Check if only one ace is visible in hand
export const onlyAceVisible = (props: OnlyAceVisibleProps): boolean => {
  const { cards } = props;

  if (!areInitialCards({ cards })) {
    return false;
  }

  return cards.some((card) => card.value === CardValue.ACE && card.faceUp);
};
