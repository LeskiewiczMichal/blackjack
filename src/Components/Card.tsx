import "./Styles/card.style.css";
import { CardValue, CardSuit } from "../types";

export type CardProps = {
    suit: CardSuit,
    value: CardValue,
    faceUp: boolean,
};

export default function Card(props: CardProps) {

    const style = {
        backgroundImage: props.faceUp ?  `url(../Images/Cards/2B.svg)` : `url(../Images/Cards/${props.value}${props.suit}.svg)`,
    }

    return (
        <div className={`card ${props.suit}${props.value}`} >
        </div>
    )

}