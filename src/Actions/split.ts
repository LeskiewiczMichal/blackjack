// Types
import { Card } from "types.d";
import { RootState } from "store/store";
// Libraries
import { createAsyncThunk } from "@reduxjs/toolkit";
// Functions
import {
  setPlayerCards,
  setPlayerScore,
  addSecondHandCard,
  setSecondScore,
  setSecondHand,
} from "store/Reducers/playerReducer";
import { calculateScore } from "Functions/calculateScore";
import { playerDrawCard } from "./playerUtils";

export const split = createAsyncThunk(
  "player/split",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const fistCard = state.player.cards[0];
    const secondCard = state.player.cards[1];

    // First hand
    const newCards: Card[] = [fistCard];
    await dispatch(setPlayerCards(newCards));
    await dispatch(setPlayerScore(calculateScore({ cards: newCards })));
    await dispatch(playerDrawCard());

    // Second hand
    await dispatch(addSecondHandCard(secondCard));
  },
);

export const switchHands = createAsyncThunk(
  "player/switchHands",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const newHand: Card[] = state.player.secondHand;
    const oldHand: Card[] = state.player.cards;
    const newScore = calculateScore({ cards: newHand });
    const oldScore = state.player.score;

    //   Manage second hand
    await dispatch(setSecondScore(oldScore));
    await dispatch(setSecondHand(oldHand));

    //   Manage new main hand
    await dispatch(setPlayerCards(newHand));
    await dispatch(setPlayerScore(newScore));
    await dispatch(playerDrawCard());
  },
);

export const playerDidSplit = createAsyncThunk(
  "player/playerDidSplit",
  async (_, { getState }): Promise<boolean> => {
    const state = getState() as RootState;
    return (
      state.player.secondScore === null && state.player.secondHand.length > 0
    );
  },
);
