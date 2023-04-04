import "./Styles/UI.style.css"
import Chip from "./Chip"
import HitButton from "./HitButton"

export default function UI() {
    return (
        <nav className="interface">
            <Chip value="one"/>
            <Chip value="ten"/>
            <Chip value="twenty-five"/>
            <HitButton/>
            <Chip value="fifty"/>
            <Chip value="hundred"/>
            <Chip value="five-hundred"/>
        </nav>
    )
}