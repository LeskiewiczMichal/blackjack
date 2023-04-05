import { Container } from "@pixi/react"

import "../Styles/UI.style.css"
import Chip from "../Chip"
import HitButton from "./HitButton"
import SplitButton from "./SplitButton"
import { ChipValue } from "../Chip"

export default function UI() {
    return (
        <Container>
            {/* <Chip value="one"/> */}
            {/* <Chip value="ten"/>
            <Chip value="twenty-five"/> */}
            {/* <HitButton/>
            <SplitButton /> */}
            {/* <Chip value="fifty"/>
            <Chip value="hundred"/>
            <Chip value="five-hundred"/> */}
            <Chip value={ChipValue.chipOne}/>
                <Chip value={ChipValue.chipTen}/>
                <Chip value={ChipValue.chipTwentyFive}/>
                <Chip value={ChipValue.chipFifty}/>
                <Chip value={ChipValue.chipHundred}/>
                <Chip value={ChipValue.chipFiveHundred}/>
        </Container>
    )
}