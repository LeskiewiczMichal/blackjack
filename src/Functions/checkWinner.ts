import { PlayerType } from "types.d";

type CheckWinnerProps = {
  playerScore: number;
  dealerScore: number;
};

const checkWinner = (props: CheckWinnerProps): PlayerType | null => {
  const { playerScore, dealerScore } = props;

  if (playerScore > 21 && dealerScore > 21) {
    return null;
  }
  if (playerScore > 21) {
    return PlayerType.DEALER;
  }
  if (dealerScore > 21 || playerScore > dealerScore) {
    return PlayerType.PLAYER;
  }
  if (playerScore < dealerScore) {
    return PlayerType.DEALER;
  }

  return null;
};

export { checkWinner };
