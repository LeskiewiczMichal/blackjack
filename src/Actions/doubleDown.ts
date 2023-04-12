import { AppThunk } from "store/store";
import { incrementBet } from "store/reducers/tableReducer";
import { playerDrawCard } from "actions/playerUtils";
import { finishGame } from "actions/finishGame";
import { TableState } from "types";

const doubleDown = (): AppThunk => async (dispatch, getState) => {
  const { currentBet } = getState().table as TableState;
  await dispatch(incrementBet(currentBet));
  await dispatch(playerDrawCard());
  await dispatch(finishGame());
};

export { doubleDown };
