import { Card, CardValue } from "types.d";

type IsFigureProps = {
  card: Card;
};

const isFigure = (props: IsFigureProps): boolean => {
  const { card } = props;
  const { value } = card;
  return (
    value === CardValue.JACK ||
    value === CardValue.QUEEN ||
    value === CardValue.KING
  );
};

export { isFigure };
