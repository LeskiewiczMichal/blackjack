import { Card, CardValue } from 'types.d';

type OnlyAceVisibleProps = {
    cards: Card[],
};

export const onlyAceVisible = (props: OnlyAceVisibleProps) => {
    const { cards } = props;    

    if (cards.length !== 2) {
        return false;
    }
    for (const card of cards) {
        if (card.value === CardValue.ACE && card.faceUp) {
            return true;
        }
    }
    return false;
}