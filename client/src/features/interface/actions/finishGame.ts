import { PlayerState, PlayerType, TableState } from "types.d";
import { RootState, AppThunk } from "store/store";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { showCards } from "store/reducers/dealerReducer";
import { setGameFinished } from "store/reducers/tableReducer";
import { setBalance } from "store/reducers/playerReducer";
import { hasBlackJack } from "utils/hasBlackJack";
import { checkWinner } from "utils/checkWinner";
import { playedTwoHands } from "utils/playedTwoHands";
import { dealerDrawUntillSeventeen } from "./dealerUtils";
import { wrapActionIntoSetActionOn } from "./wrapActionIntoHandler";

// Add's money to player's account
const playerWon = (): AppThunk => async (dispatch, getState) => {
  const { currentBet } = getState().table as TableState;
  const { balance, cards } = getState().player as PlayerState;

  if (hasBlackJack({ cards })) {
    dispatch(setBalance(balance + currentBet * 1.5));
    return;
  }

  dispatch(setBalance(balance + currentBet));
};

// Remove's money from player's account
const playerLost = (): AppThunk => async (dispatch, getState) => {
  const { balance } = getState().player as PlayerState;
  const { currentBet } = getState().table as TableState;
  dispatch(setBalance(balance - currentBet));
};

// Check if player's hand's are over 21
const scoresOverTwentyOne =
  (): ThunkAction<Promise<boolean>, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const player = getState().player as PlayerState;
    const { score, secondScore } = player;
    if (score > 21) {
      if (!playedTwoHands({ player })) {
        // If player didn't split, he lost
        await dispatch(playerLost());
        return true;
      }
      if (secondScore! > 21) {
        // If player split and both hands are over 21, he lost
        await dispatch(playerLost());
        await dispatch(playerLost());
        return true;
      }
    }
    return false;
  };

// If table has insurance bet, check who won and update balance
const checkForInsurance = (): AppThunk => async (dispatch, getState) => {
  const state = getState() as RootState;
  const { table, player, dealer } = state;
  if (table.insuranceBet === null) {
    return;
  }
  if (hasBlackJack({ cards: dealer.cards })) {
    await dispatch(setBalance(player.balance + table.insuranceBet * 2));
  } else {
    await dispatch(setBalance(player.balance - table.insuranceBet));
  }
};

// End game and check who won
const finishGame = (): AppThunk => async (dispatch, getState) => {
  await dispatch(showCards()); // Flip dealer's hidden card
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 900)); // Use a Promise to wait
  await dispatch(setGameFinished(true));
  await dispatch(checkForInsurance());

  const ended: boolean = await dispatch(scoresOverTwentyOne());
  if (ended) {
    return;
  }

  await dispatch(dealerDrawUntillSeventeen());

  const { player, dealer } = getState() as RootState;
  const { score: playerScore, secondScore: playerSecondScore } = player;
  const { score: dealerScore } = dealer;

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
  if (playedTwoHands({ player })) {
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
};

const finishGameWithSetActionOn = (): AppThunk =>
  wrapActionIntoSetActionOn(async (dispatch) => {
    await dispatch(finishGame());
  });

export { finishGameWithSetActionOn as finishGame };
