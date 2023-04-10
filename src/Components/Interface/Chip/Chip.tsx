import "./chip.style.css";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { incrementBet } from "store/reducers/tableReducer";

export enum ChipValue {
  chipOne = "one",
  chipTen = "ten",
  chipTwentyFive = "twenty-five",
  chipFifty = "fifty",
  chipHundred = "hundred",
  chipFiveHundred = "five-hundred",
}

type ChipProps = {
  value: ChipValue;
};

export default function Chip(props: ChipProps) {
  const dispatch = useAppDispatch();
  const inGame = useAppSelector((state) => state.table.inGame);
  const bet = useAppSelector((state) => state.table.currentBet);
  const playerBalance = useAppSelector((state) => state.player.balance);
  const { value } = props;

  // Get the value of the chip to increment the bet by
  let incremenetValue = 0;
  switch (value) {
    case ChipValue.chipOne:
      incremenetValue = 1;
      break;
    case ChipValue.chipTen:
      incremenetValue = 10;
      break;
    case ChipValue.chipTwentyFive:
      incremenetValue = 25;
      break;
    case ChipValue.chipFifty:
      incremenetValue = 50;
      break;
    case ChipValue.chipHundred:
      incremenetValue = 100;
      break;
    case ChipValue.chipFiveHundred:
      incremenetValue = 500;
      break;
    default:
      break;
  }

  // Handle incrementing the bet
  const handleBet = () => {
    // Check if the player has enough money to bet
    if (bet + incremenetValue > playerBalance) {
      return;
    }
    dispatch(incrementBet(incremenetValue));
  };

  return (
    <button
      type="button"
      className={`chip chip-${value}`}
      onClick={handleBet}
      disabled={inGame}
      aria-label={`Select chip with value ${value}`}
    />
  );
}
