// Types
import { Card, CardSuit, CardValue } from 'types.d';

const NUMBER_OF_DECKS = 6;

// Create and return a few decks of cards
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
  for (let i = 0; i < NUMBER_OF_DECKS; i++) {
    for (const suit of suits) {
      for (const value of values) {
        cards.push({ suit, value, faceUp: true });
      }
    }
  }

  return cards;
}
