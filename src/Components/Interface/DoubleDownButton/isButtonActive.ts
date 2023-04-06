import { Card } from "types.d"

type IsButtonActiveProps = {
    cards: Card[],
}

export default function isButtonActive(props: IsButtonActiveProps): boolean {
    const { cards } = props;
    // if (cards.length === 2 && cards[0].value === cards[1].value) {
    if (cards.length === 2) {
        return true;
    }
    return false;
}