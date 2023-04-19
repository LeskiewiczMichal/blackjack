import { AppThunk } from "store/store";
import { DealerState, PlayerState, TableState } from "types.d";
import {
  setGameFinished,
  setInGame,
  setPopUpActive,
} from "store/reducers/tableReducer";
import { hasBlackJack } from "utils/hasBlackJack";
import { onlyAceVisible } from "utils/onlyAceVisible";
import { playerDrawCard } from "./playerUtils";
import { dealerDrawCard } from "./dealerUtils";
import { finishGame } from "./finishGame";
import { wrapActionIntoSetActionOn } from "./wrapActionIntoHandler";

const NUMBER_OF_CARDS_FOR_EACH_PLAYER = 2;

// Set's bet and deals initial cards
const deal = (): AppThunk => async (dispatch, getState) => {
  const { currentBet } = getState().table as TableState;

  if (currentBet === 0) {
    return;
  }
  await dispatch(setGameFinished(false));
  await dispatch(setInGame(true));
  for (let i = 0; i < NUMBER_OF_CARDS_FOR_EACH_PLAYER; i++) {
    await dispatch(playerDrawCard());
    await dispatch(dealerDrawCard());
  }

  const { cards: dealerCards } = getState().dealer as DealerState;
  const { cards: playerCards } = getState().player as PlayerState;

  if (hasBlackJack({ cards: playerCards })) {
    await dispatch(finishGame());
    return;
  }
  if (onlyAceVisible({ cards: dealerCards })) {
    await dispatch(setPopUpActive(true));
  }
};

const dealWithSetActionOn = (): AppThunk =>
  wrapActionIntoSetActionOn(async (dispatch) => {
    await dispatch(deal());
  });

export { dealWithSetActionOn as deal };
