import { AppThunk } from "store/store";
import { incrementBet } from "store/reducers/tableReducer";
import { playerDrawCard } from "actions/playerUtils";
import { finishGame } from "actions/finishGame";
import { TableState } from "types";
import { wrapActionIntoSetActionOn } from "./wrapActionIntoHandler";

const doubleDown = (): AppThunk => async (dispatch, getState) => {
  const { currentBet } = getState().table as TableState;
  await dispatch(incrementBet(currentBet));
  await dispatch(playerDrawCard());
  await dispatch(finishGame());
};

const doubleDownWithSetActionOn = (): AppThunk =>
  wrapActionIntoSetActionOn(async (dispatch) => {
    await dispatch(doubleDown());
  });

export { doubleDownWithSetActionOn as doubleDown };
