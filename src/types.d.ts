/// Card ///
export enum CardSuit {
    HEARTS = "HEARTS",
    DIAMONDS = "DIAMONDS",
    CLUBS = "CLUBS",
    SPADES = "SPADES",
}

export enum CardValue {
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
    SIX = 6,
    SEVEN = 7,
    EIGHT = 8,
    NINE = 9,
    TEN, JACK, QUEEN, KING = 10,
    ACE = 11 | 1,
}

export type Card = {
    suit: CardSuit,
    value: CardValue,
    faceUp: boolean,
}

/// Chips ///
export enum ChipValue {
    ONE = 1,
    TEN = 10,
    TWENTYFIVE = 25,
    FIFTY = 50,
    HUNDRED = 100,
    FIVEHUNDRED = 500,
}

/// Player and dealer ///

export enum PlayerType {
    PLAYER = PlayerState,
    DEALER = "dealer",
}


export type PlayerState = {
    cards: Card[],
    score: number,
    balance: number,
}

export type DealerState = {
    cards: Card[],
    score: number,
}

export interface Dealer {
    cards: Card[],
    score: number,
}

export interface PlayerInterface {
    cards: Card[],
    score: number,
    balance: number,
    betAdd(value: ChipValue): boolean,
}

/// Table ///
export type TableState = {
    currentBet: number,
    cards: Card[],
    inGame: boolean,
    // dealer: DealerInterface,
    // player: PlayerInterface,
}

export enum Action {
    DEAL = "deal",
    BET = "bet",
}

export type TableAction = 
    | {type: "deal", payload: {balance: number, bet: number, }}
    | {type: "bet", payload: {value: ChipValue[]}}

