import { RootState } from "store/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setGameFinished,
  setInGame,
  setPopUpActive,
} from "store/reducers/tableReducer";
import { playerDrawCard } from "actions/playerUtils";
import { dealerDrawCard } from "actions/dealerUtils";
import { hasBlackJack } from "utils/hasBlackJack";
import { onlyAceVisible } from "utils/onlyAceVisible";
import { finishGame } from "actions/gameState";

const NUMBER_OF_CARDS_FOR_EACH_PLAYER = 2;

// Set's bet and deals initial cards
const deal = createAsyncThunk(
  "table/deal",
  async (_, { getState, dispatch }) => {
    let state = getState() as RootState;

    if (state.table.currentBet === 0) {
      return;
    }

    await dispatch(setGameFinished(false));
    await dispatch(setInGame(true));

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

export { deal };
