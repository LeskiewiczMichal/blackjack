import { PlayerType } from "types.d";
import { RootState } from "store/store";
import { createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import { showCards } from "store/reducers/dealerReducer";
import { setGameFinished, incrementBet } from "store/reducers/tableReducer";
import { setBalance } from "store/reducers/playerReducer";
import { hasBlackJack } from "utils/hasBlackJack";
import { checkWinner } from "utils/checkWinner";
import { playedTwoHands } from "utils/playedTwoHands";
import { dealerDrawUntillSeventeen } from "actions/dealerUtils";
import { clearTable } from "actions/clearTable";
import { deal } from "./deal";

const rebet = createAsyncThunk(
  "game/rebet",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    if (state.player.balance < state.table.currentBet) {
      return;
    }
    const bet = state.table.currentBet;
    await dispatch(clearTable());
    await dispatch(incrementBet(bet));
    await dispatch(deal());
  },
);

// Add's money to player's account
const playerWon = createAsyncThunk(
  "game/playerWon",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const bet = state.table.currentBet;
    const { balance } = state.player;

    if (hasBlackJack({ cards: state.player.cards })) {
      dispatch(setBalance(balance + bet * 1.5));
      return;
    }

    dispatch(setBalance(balance + bet));
  },
);

// Remove's money from player's account
const playerLost = createAsyncThunk(
  "game/playerWon",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const bet = state.table.currentBet;
    const { balance } = state.player;
    dispatch(setBalance(balance - bet));
  },
);

// Check if player's hand's are over 21
const scoresOverTwentyOne = createAsyncThunk(
  "player/scoresOverTwentyOne",
  async (_, { getState, dispatch }): Promise<boolean> => {
    const state = getState() as RootState;
    if (state.player.score > 21) {
      if (!playedTwoHands({ player: state.player })) {
        // If player didn't split, he lost
        await dispatch(playerLost());
        return true;
      }
      if (state.player.secondScore! > 21) {
        // If player split and both hands are over 21, he lost
        await dispatch(playerLost());
        await dispatch(playerLost());
        return true;
      }
    }
    return false;
  },
);

// If table has insurance bet, check who won and update balance
const checkForInsurance = createAsyncThunk(
  "game/checkInsurance",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    if (state.table.insuranceBet === null) {
      return;
    }
    if (hasBlackJack({ cards: state.dealer.cards })) {
      await dispatch(
        setBalance(state.player.balance + state.table.insuranceBet * 2),
      );
    } else {
      await dispatch(
        setBalance(state.player.balance - state.table.insuranceBet),
      );
    }
  },
);

// End game and check who won
const finishGame = createAsyncThunk(
  "game/finishGame",
  async (_, { getState, dispatch }) => {
    await dispatch(showCards()); // Flip dealer's hidden card
    await dispatch(setGameFinished(true));
    await dispatch(checkForInsurance());

    const ended: boolean = unwrapResult(await dispatch(scoresOverTwentyOne()));
    if (ended) {
      return;
    }

    await dispatch(dealerDrawUntillSeventeen());

    const state = getState() as RootState;
    const { score: playerScore, secondScore: playerSecondScore } = state.player;
    const { score: dealerScore } = state.dealer;

    let winner = checkWinner({
      playerScore,
      dealerScore,
    });

    if (winner === PlayerType.PLAYER) {
      await dispatch(playerWon());
    } else if (winner === PlayerType.DEALER) {
      await dispatch(playerLost());
    }

    // If player has split, check second hand
    if (playedTwoHands({ player: state.player })) {
      winner = checkWinner({
        playerScore: playerSecondScore!,
        dealerScore,
      });
      if (winner === PlayerType.PLAYER) {
        await dispatch(playerWon());
      } else if (winner === PlayerType.DEALER) {
        await dispatch(playerLost());
      }
    }
  },
);

export { rebet, finishGame };
