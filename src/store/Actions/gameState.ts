// Types
import { RootState } from "store/store";
// Libraries
import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
// Functions
import { showCards } from "store/Reducers/dealerReducer";
import { setGameFinished } from "store/Reducers/tableReducer";
import { setBalance } from "store/Reducers/playerReducer";
import { dealerDrawUntillSeventeen } from "./dealerUtils";
import { clearTable } from "./clearTable";
import { incrementBet } from "store/Reducers/tableReducer";
import { makeDeal } from "./bets";
import { hasBlackJack } from "store/Reducers/Functions/hasBlackJack";


// End game and check who won
export const finishGame = createAsyncThunk(
  "game/finishGame",
  async (_, { getState, dispatch }) => {
    let state = getState() as RootState;

    await dispatch(showCards()); // Flip dealer's hidden card
    await dispatch(setGameFinished(true)); // Set gameFinished to true
    state = getState() as RootState;

    // Check if player won insurance bet
    if (state.table.insuranceBet != null) {
      if (hasBlackJack({ cards: state.dealer.cards })) {
        await dispatch(setBalance(state.player.balance + state.table.insuranceBet * 2));
      } else {
        await dispatch(setBalance(state.player.balance - state.table.insuranceBet));
      }
    }

    // Check if player's hand's are over 21
    const ended: boolean = unwrapResult(await dispatch(scoresOverTwentyOne()));
    if (ended) {
      return;
    }

    await dispatch(dealerDrawUntillSeventeen()); // Dealer draws cards untill he's score is 17 or more
    state = getState() as RootState; // Need to update state after dealer's draw

    // Cheching game's result and updating balance
    await dispatch(checkGameResult(state.player.score));
    if (state.player.secondScore !== null) {
      // If player has split, check second hand
      await dispatch(checkGameResult(state.player.secondScore));
    }
  }
);

export const rebet = createAsyncThunk(
  "game/rebet",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    if (state.player.balance < state.table.currentBet) {
      return;
    }
    const bet = state.table.currentBet;
    await dispatch(clearTable());
    await dispatch(incrementBet(bet));
    await dispatch(makeDeal());
  }
);


// Check's who won and updates balance
const checkGameResult = createAsyncThunk(
  "game/checkGameResult",
  async (playerScore: number, { getState, dispatch }) => {
    const state = getState() as RootState;
    const dealerScore = state.dealer.score;
    if (playerScore > 21 && dealerScore > 21) {
      return;
    }
    if (playerScore > 21) {
      await dispatch(playerLost());
      return;
    }
    if (dealerScore > 21 || playerScore > dealerScore) {
      await dispatch(playerWon());
      return;
    } else if (playerScore < dealerScore) {
      await dispatch(playerLost());
      return;
    }
    return;
  }
);

// Add's money to player's account
const playerWon = createAsyncThunk(
  "game/playerWon",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const bet = state.table.currentBet;
    const balance = state.player.balance;

    if (hasBlackJack({ cards: state.player.cards })) {
      dispatch(setBalance(balance + bet * 1.5));
      return;
    }

    dispatch(setBalance(balance + bet));
  }
);

// Remove's money from player's account
const playerLost = createAsyncThunk(
  "game/playerWon",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const bet = state.table.currentBet;
    const balance = state.player.balance;
    dispatch(setBalance(balance - bet));
  }
);

// Check if player's hand's are over 21
const scoresOverTwentyOne = createAsyncThunk(
  "player/scoresOverTwentyOne",
  async (_, { getState, dispatch }): Promise<boolean> => {
    const state = getState() as RootState;
    if (state.player.score > 21) {
      if (state.player.secondScore === null) {
        // If player didn't split, he lost
        await dispatch(playerLost());
        return true;
      }
      if (state.player.secondScore > 21) {
        // If player split and both hands are over 21, he lost
        await dispatch(playerLost());
        await dispatch(playerLost());
        return true;
      }
    }
    return false;
  }
);
