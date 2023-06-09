import "./chip.scss";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { incrementBet } from "store/reducers/tableReducer";
import { Howl } from "howler";
import sound from "assets/sounds/chip.mp3";

const chipSound = new Howl({
  src: [sound],
});

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
  const soundsPlaying = useAppSelector((state) => state.helpers.soundsPlaying);
  const skin = useAppSelector((state) => state.skins.chips);
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

  let skinClass = "--Default";
  if (skin) {
    skinClass = `--${skin.name}`;
  }

  console.log(skinClass);

  // Handle incrementing the bet
  const handleBet = async () => {
    // Check if the player has enough money to bet
    if (bet + incremenetValue > playerBalance) {
      return;
    }
    if (soundsPlaying) {
      chipSound.play();
    }

    await dispatch(incrementBet(incremenetValue));
  };

  return (
    <button
      type="button"
      className={`chip chip-${value}${skinClass}`}
      onClick={handleBet}
      disabled={inGame}
      aria-label={`Select chip with value ${value}`}
    />
  );
}
