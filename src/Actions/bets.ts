// Types
import { RootState } from "store/store";
// Libraries
import { createAsyncThunk } from "@reduxjs/toolkit";
// Functions
import {
  setGameFinished,
  setInGame,
  setPopUpActive,
  setInsuranceBet,
} from "store/Reducers/tableReducer";
import { playerDrawCard } from "Actions/playerUtils";
import { dealerDrawCard } from "Actions/dealerUtils";
import { hasBlackJack } from "Functions/hasBlackJack";
import { onlyAceVisible } from "Functions/onlyAceVisible";
import { finishGame } from "Actions/gameState";

const NUMBER_OF_CARDS_FOR_EACH_PLAYER = 2;

export const makeDeal = createAsyncThunk(
  "table/deal",
  async (_, { getState, dispatch }) => {
    let state = getState() as RootState;

    // If there is no bet, do nothing
    if (state.table.currentBet === 0) {
      return;
    }

    await dispatch(setGameFinished(false));
    await dispatch(setInGame(true));

    // Draw initial cards for each player
    for (let i = 0; i < NUMBER_OF_CARDS_FOR_EACH_PLAYER; i++) {
      await dispatch(playerDrawCard());
      await dispatch(dealerDrawCard());
    }

    state = getState() as RootState;
    if (hasBlackJack({ cards: state.player.cards })) {
      await dispatch(finishGame());
      return;
    }

    if (onlyAceVisible({ cards: state.dealer.cards })) {
      await dispatch(setPopUpActive(true));
    }
  },
);

export const betInsurance = createAsyncThunk(
  "table/betInsurance",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    if (state.player.balance < Math.floor(state.table.currentBet / 2)) {
      return;
    }
    await dispatch(setInsuranceBet(Math.floor(state.table.currentBet / 2)));
  },
);
