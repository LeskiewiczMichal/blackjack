import { Card, CardValue } from 'types.d';

type HasBlackJackProps = {
    cards: Card[],
}

export function hasBlackJack(props: HasBlackJackProps): boolean {
    const { cards } = props;

    if (cards.length !== 2) {
        return false;
    }

    let hasFigure = false;
    let hasAce = false;

    for (const card of cards) {
        if (card.value === CardValue.ACE) {
            hasAce = true;
            continue;
        }
        if (card.value === CardValue.JACK || card.value === CardValue.QUEEN || card.value === CardValue.KING) {
            hasFigure = true;
            continue;
        }
    }

    if (hasAce && hasFigure) {
        return true;
    }
    return false;
}