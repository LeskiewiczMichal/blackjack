import { PlayerState, TableState } from "types.d";
import { AppThunk } from "store/store";
import { incrementBet } from "store/reducers/tableReducer";
import { wrapActionIntoSetActionOn } from "actions/wrapActionIntoHandler";
import { clearTable } from "./clearTable";
import { deal } from "./deal";

const rebet = (): AppThunk => async (dispatch, getState) => {
  const { balance } = getState().player as PlayerState;
  const { currentBet } = getState().table as TableState;
  if (balance < currentBet) {
    return;
  }

  await dispatch(clearTable());
  await dispatch(incrementBet(currentBet));
  await dispatch(deal());
};

const rebetWithSetActionOn = (): AppThunk =>
  wrapActionIntoSetActionOn(async (dispatch) => {
    await dispatch(rebet());
  });

export { rebetWithSetActionOn as rebet };
