import "./Styles/chip.style.css"
import { useDispatch, useSelector } from "react-redux";
import { incremenetBet } from "../store/Reducers/tableReducer";
import { RootState } from "../store/store";


export enum ChipValue {
    chipOne = "one",
    chipTen = "ten",
    chipTwentyFive = "twenty-five",
    chipFifty = "fifty",
    chipHundred = "hundred",
    chipFiveHundred = "five-hundred",
}

type ChipProps = {
    value: ChipValue,
}
   
export default function Chip(props: ChipProps) {
    const dispatch = useDispatch()
    const inGame = useSelector((state: RootState) => state.table.inGame);
    const bet = useSelector((state: RootState) => state.table.currentBet);
    const playerBalance = useSelector((state: RootState) => state.player.balance);

    // Get the value of the chip to increment the bet by
    let incremenetValue: number = 0;
    switch (props.value) {
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
    }

    // Handle incrementing the bet
    const handleClick = () => {
        if (bet + incremenetValue > playerBalance) {
            return;
        }
        dispatch(incremenetBet(incremenetValue));
    }

    return (
        <button
            type="button"
            className={`chip chip-${props.value}`}
            onClick={handleClick}
            disabled={inGame}
        ></button>
    )
}