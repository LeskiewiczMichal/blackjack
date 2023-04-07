// Types
import { PlayerType, Card } from "types.d";
import { RootState } from "store/store";

// Libraries
import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";

// Functions
import { showCards } from "store/Reducers/dealerReducer";
import { setGameFinished } from "store/Reducers/tableReducer";
import {
  setBalance,
  setPlayerCards,
  setPlayerScore,
  setSecondHand,
  setSecondScore,
} from "store/Reducers/playerReducer";
import { dealerDrawCard } from "./dealerUtils";
import { calculateScore } from "store/Reducers/Functions/calculateScore";
import { playerDrawCard } from "./playerUtils";

type Winner = PlayerType | null;

// End game and check who won
export const finishGame = createAsyncThunk(
  "game/finishGame",
  async (_, { getState, dispatch }) => {
    let state = getState() as RootState;

    if (
      state.player.secondHand.length === 0 ||
      (state.player.secondScore !== null && state.player.secondHand.length > 0)
    ) {
      await dispatch(showCards()); // Flip dealer's hidden card
      await dispatch(setGameFinished(true)); // Set gameFinished to true

      // If player did go over 21, he already lost
      if (state.player.score > 21) {
        if (state.player.secondScore === null) {
            await dispatch(playerLost());
            return;
        }
        if (state.player.secondScore > 21) {
            await dispatch(playerLost());
            await dispatch(playerLost());
            return;
        }
      }

      // Dealer draws cards untill he's score is 17 or more
      let dealerScore = state.dealer.score;
      while (dealerScore < 17) {
        await dispatch(dealerDrawCard());
        state = getState() as RootState;
        dealerScore = state.dealer.score;
      }

      // Chechking game's result - if dealer did go over 21 and if not comparing with player
      let winner: Winner = unwrapResult(
        await dispatch(checkGameResult([state.player.score, dealerScore]))
      );
      if (winner === PlayerType.PLAYER) {
        await dispatch(playerWon());
      } else if (winner === PlayerType.DEALER) {
        await dispatch(playerLost());
      } else {
        console.log("draw");
      }

      // If player did split, check second hand score too
      if (state.player.secondScore !== null) {
        winner = unwrapResult(
          await dispatch(
            checkGameResult([state.player.secondScore, dealerScore])
          )
        );
        if (winner === PlayerType.PLAYER) {
          await dispatch(playerWon());
        } else if (winner === PlayerType.DEALER) {
          await dispatch(playerLost());
        } else {
          console.log("draw");
        }
      }
    } else {
      // // If player did split, play second hand
      // if (state.player.secondHand.length > 0) {
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
    }

    // }
  }
);

// Returns type of player who won or null if it's a draw
const checkGameResult = createAsyncThunk(
  "game/checkGameResult",
  async (
    [playerScore, dealerScore]: number[],
    { getState }
  ): Promise<Winner> => {
    if (playerScore > 21 && dealerScore > 21) {
        return null;
    }
    if (playerScore > 21) {
      return PlayerType.DEALER;
    }
    if (dealerScore > 21 || playerScore > dealerScore) {
      return PlayerType.PLAYER;
    } else if (playerScore < dealerScore) {
      return PlayerType.DEALER;
    }
    return null;
  }
);

// Add's money to player's account
const playerWon = createAsyncThunk(
  "game/playerWon",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const bet = state.table.currentBet;
    const balance = state.player.balance;
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
