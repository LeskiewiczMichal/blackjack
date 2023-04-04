import { Container } from "@pixi/react"

import "../Styles/UI.style.css"
import Chip from "../Chip"
import HitButton from "./HitButton"
import SplitButton from "./SplitButton"

export default function UI() {
    return (
        <Container>
            <Chip value="one"/>
            {/* <Chip value="ten"/>
            <Chip value="twenty-five"/> */}
            {/* <HitButton/>
            <SplitButton /> */}
            {/* <Chip value="fifty"/>
            <Chip value="hundred"/>
            <Chip value="five-hundred"/> */}
        </Container>
    )
}