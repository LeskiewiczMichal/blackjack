// / Card ///
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
  TEN = 10,
  ACE,
  JACK,
  QUEEN,
  KING,
}

export type Card = {
  suit: CardSuit;
  value: CardValue;
  faceUp: boolean;
};

// / Chips ///
export enum ChipValue {
  ONE = 1,
  TEN = 10,
  TWENTYFIVE = 25,
  FIFTY = 50,
  HUNDRED = 100,
  FIVEHUNDRED = 500,
}

// / Player and dealer ///

export enum PlayerType {
  PLAYER = "Player",
  DEALER = "Dealer",
}

export type PlayerState = {
  cards: Card[];
  score: number;
  secondScore: number | null;
  balance: number;
  secondHand: Card[];
};

export type DealerState = {
  cards: Card[];
  score: number;
};

export interface Dealer {
  cards: Card[];
  score: number;
}

export interface PlayerInterface {
  cards: Card[];
  score: number;
  balance: number;
  betAdd(value: ChipValue): boolean;
}

// / Table ///
export type TableState = {
  currentBet: number;
  cards: Card[];
  inGame: boolean;
  gameFinished: boolean;
  popUpActive: boolean;
  insuranceBet: number | null;
  actionOn: boolean;
};

export enum Action {
  DEAL = "deal",
  BET = "bet",
}

export type TableAction =
  | { type: "deal"; payload: { balance: number; bet: number } }
  | { type: "bet"; payload: { value: ChipValue[] } };

/// HELPERS ///
export type HelperSliceState = {
  disableSwapHandsAnimation: boolean;
  soundsPlaying: boolean;
  sweepCards: boolean;
};

export enum Routes {
  PROFILE = "/profile",
  LOGIN = "/profile/login",
  REGISTER = "/profile/register",
  MENU = "/menu",
  GAME = "/game",
  SHOP = "/shop",
}

// AUTHENTICATION ///
export type User = {
  username: string;
  email: string;
  balance: number;
  owedSkins: Skin[];
  activeSkins: Skin[];
};

export type AuthReducerState = {
  user: string | null;
  email: string | null;
  error: string | null;
};

/// SKINS ///
export enum SkinNames {
  NEON = "Neon",
  DARK = "Dark",
}

export enum SkinCategories {
  CARDS = "Cards",
  CHIPS = "Chips",
  INTERFACE_BACKGROUND = "InterfaceBackground",
}

export type Skin = {
  id: string;
  name: string;
  price: number;
  category: SkinCategories;
};

export type ActiveSkinsSlice = {
  chips: Skin | null;
  cards: Skin | null;
  interfaceBackground: Skin | null;
};

/// SHOP ///
export type ShopSliceState = {
  skins: Skin[] | null;
  ownedSkins: Skin[] | null;
  skinPreview: Skin | null;
};
