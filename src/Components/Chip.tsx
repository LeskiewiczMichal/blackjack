import "./Styles/chip.style.css"

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

    const handleClick = () => {
        console.log(`chip ${props.value} clicked`);
    }

    return (
        <button
            type="button"
            className={`chip chip-${props.value}`}
            onClick={handleClick}
        ></button>
    )
}