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

    return (
        <button
            type="button"
            className={`chip chip-${props.value}`}
            onClick={() => dispatch(incremenetBet())}
        ></button>
    )
}