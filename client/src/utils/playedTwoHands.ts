import { PlayerState } from "types.d";

type PlayedTwoHandsProps = {
  player: PlayerState;
};

const playedTwoHands = (props: PlayedTwoHandsProps): boolean => {
  const { player } = props;

  if (player.secondScore !== null) {
    return true;
  }

  return false;
};

export { playedTwoHands };
