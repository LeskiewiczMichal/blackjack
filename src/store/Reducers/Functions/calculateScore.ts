import { Card, CardValue } from "types.d"

type CalculateScoreProps = {
    cards: Card[],
}

export function calculateScore(props: CalculateScoreProps) {
    const { cards } = props;
    let score = 0;
    for (const card of cards) {
        if (!card.faceUp) continue;
        if (card.value === CardValue.ACE) {
            if (score + 11 > 21) {
                score += 1;
                continue;
            }
            else {
                score += 11;
                continue;
            }
        }
        if (card.value === CardValue.QUEEN || card.value === CardValue.KING || card.value === CardValue.JACK) {
            score += 10;
            continue;
        }
        score += card.value;
    }
    return score;
}