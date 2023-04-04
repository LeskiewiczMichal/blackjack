import "./Styles/chip.style.css"

type ChipProps = {
    value: string
}

export default function Chip(props: ChipProps) {
    return (
        <button type="button" className={`chip chip-${props.value}`}></button>
    )
}