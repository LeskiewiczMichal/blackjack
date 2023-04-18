import { Card, CardSuit, CardValue } from "types.d";

const NUMBER_OF_DECKS = 6;

// Create and return a few decks of cards
export function generateCards(): Card[] {
  const suits: CardSuit[] = [
    CardSuit.HEARTS,
    CardSuit.DIAMONDS,
    CardSuit.CLUBS,
    CardSuit.SPADES,
  ];
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

  const cards: Card[] = Array.from({ length: NUMBER_OF_DECKS }).flatMap(() =>
    suits.flatMap((suit) =>
      values.map((value) => ({
        suit,
        value,
        faceUp: true,
      })),
    ),
  );

  return cards;
}
