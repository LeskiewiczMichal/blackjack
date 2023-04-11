import { Card } from "types.d";
import { RootState } from "store/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setPlayerCards,
  setPlayerScore,
  addSecondHandCard,
  setSecondScore,
  setSecondHand,
} from "store/reducers/playerReducer";
import { setDisableSwapHandsAnimation } from "store/reducers/helperReducer";
import { calculateScore } from "utils/calculateScore";
import { playerDrawCard } from "actions/playerUtils";

const split = createAsyncThunk(
  "player/split",
  async (_, { getState, dispatch }): Promise<void> => {
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

const switchHands = createAsyncThunk(
  "player/switchHands",
  async (_, { getState, dispatch }): Promise<void> => {
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
    await dispatch(setDisableSwapHandsAnimation(true));
    await dispatch(playerDrawCard());

    await dispatch(setDisableSwapHandsAnimation(false));
  },
);

const playerDidSplit = createAsyncThunk(
  "player/playerDidSplit",
  async (_, { getState }): Promise<boolean> => {
    const state = getState() as RootState;
    return (
      state.player.secondScore === null && state.player.secondHand.length > 0
    );
  },
);

export { split, switchHands, playerDidSplit };
