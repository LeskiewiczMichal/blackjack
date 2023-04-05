import { Card, CardSuit, CardValue } from '../../../types.d';


export function generateCards(): Card[] {
    const cards: Card[] = [];
    const suits: CardSuit[] = [CardSuit.HEARTS, CardSuit.DIAMONDS, CardSuit.CLUBS, CardSuit.SPADES];
    const values: CardValue[] = [
        CardValue.TWO,
        CardValue.THREE,
        CardValue.FOUR,
        CardValue.FIVE,
        CardValue.SIX,
        CardValue.SEVEN,
        CardValue.EIGHT,
        CardValue.NINE,
        CardValue.TEN,
        CardValue.JACK,
        CardValue.QUEEN,
        CardValue.KING,
        CardValue.ACE,
    ];
    for (let i = 0; i < 6; i++) {
        for (const suit of suits) {
            for (const value of values) {
                cards.push({ suit, value});
            }
        }
    }

    return cards;
}