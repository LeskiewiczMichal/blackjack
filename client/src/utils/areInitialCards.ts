import { Card } from "types.d";

type AreInitialCardsProps = {
  cards: Card[];
};

export const areInitialCards = (props: AreInitialCardsProps): boolean => {
  const { cards } = props;

  if (cards.length !== 2) {
    return false;
  }

  return true;
};
