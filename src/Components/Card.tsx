import "./Styles/card.style.css";
import { CardValue, CardSuit } from "../types";

export type CardProps = {
    suit: CardSuit,
    value: CardValue,
    faceUp: boolean,
};

export default function Card(props: CardProps) {
    return (
        <div className={`card ${props.suit}${props.value}`} >
        </div>
    )

}