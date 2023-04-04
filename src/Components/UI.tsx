import "./Styles/UI.style.css"
import Chip from "./Chip"
import HitButton from "./HitButton"
import SplitButton from "./Interface/SplitButton"

export default function UI() {
    return (
        <nav className="interface">
            <section className="interface--main">
                <HitButton />
                <SplitButton />
            </section>
        </nav>
    )
}