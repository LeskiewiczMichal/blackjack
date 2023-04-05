import "./Styles/chip.style.css"
import { useDispatch } from "react-redux";
import deal, { incremenetBet } from "../store/Reducers/tableReducer";

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

    return (
        <button
            type="button"
            className={`chip chip-${props.value}`}
            onClick={() => dispatch(incremenetBet(incremenetValue))}
        ></button>
    )
}