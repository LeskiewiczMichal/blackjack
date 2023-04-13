import { Card, PlayerState } from "types.d";
import { RootState, AppThunk } from "store/store";
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
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { wrapActionIntoSetActionOn } from "./wrapActionIntoHandler";

const split = (): AppThunk => async (dispatch, getState) => {
  const { cards: playerCards } = getState().player as PlayerState;
  const fistCard = playerCards[0];
  const secondCard = playerCards[1];

  // First hand
  const newCards: Card[] = [fistCard];
  await dispatch(setPlayerCards(newCards));
  await dispatch(setPlayerScore(calculateScore({ cards: newCards })));
  await dispatch(playerDrawCard());

  // Second hand
  await dispatch(addSecondHandCard(secondCard));
};

const switchHands = (): AppThunk => async (dispatch, getState) => {
  const player = getState().player as PlayerState;
  const newHand: Card[] = player.secondHand;
  const oldHand: Card[] = player.cards;
  const oldScore = player.score;
  const newScore = calculateScore({ cards: newHand });

  //   Manage second hand
  await dispatch(setSecondScore(oldScore));
  await dispatch(setSecondHand(oldHand));

  //   Manage new main hand
  await dispatch(setPlayerCards(newHand));
  await dispatch(setPlayerScore(newScore));
  await dispatch(setDisableSwapHandsAnimation(true));
  await dispatch(playerDrawCard());

  await dispatch(setDisableSwapHandsAnimation(false));
};

const playerDidSplit =
  (): ThunkAction<Promise<boolean>, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const player = getState().player as PlayerState;
    return player.secondScore === null && player.secondHand.length > 0;
  };

// Wrap function into setAction
const splitWithSetActionOn = (): AppThunk =>
  wrapActionIntoSetActionOn(async (dispatch) => {
    await dispatch(split());
  });

const switchHandsWithSetActionOn = (): AppThunk =>
  wrapActionIntoSetActionOn(async (dispatch) => {
    await dispatch(switchHands());
  });

export {
  splitWithSetActionOn as split,
  switchHandsWithSetActionOn as switchHands,
  playerDidSplit,
};
