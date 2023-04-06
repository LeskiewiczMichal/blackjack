import { Card } from "types.d"

type IsSplitActiveProps = {
    cards: Card[],
}

export default function isSplitActive(props: IsSplitActiveProps): boolean {
    const { cards } = props;
    if (cards.length === 2 && cards[0].value === cards[1].value) {
        return true;
    }
    return false;
}