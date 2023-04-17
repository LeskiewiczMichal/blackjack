import { PlayerState, TableState } from "types.d";
import { AppThunk } from "store/store";
import { incrementBet } from "store/reducers/tableReducer";
import { setSweepCards } from "store/reducers/helperReducer";
import { wrapActionIntoSetActionOn } from "actions/wrapActionIntoHandler";
import { clearTable } from "./clearTable";
import { deal } from "./deal";

const rebet = (): AppThunk => async (dispatch, getState) => {
  const { balance } = getState().player as PlayerState;
  const { currentBet } = getState().table as TableState;
  if (balance < currentBet) {
    return;
  }

  await dispatch(setSweepCards(true));
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for animation to end
  await dispatch(clearTable());
  await dispatch(incrementBet(currentBet));
  await dispatch(setSweepCards(false));
  await dispatch(deal());
};

const rebetWithSetActionOn = (): AppThunk =>
  wrapActionIntoSetActionOn(async (dispatch) => {
    await dispatch(rebet());
  });

export { rebetWithSetActionOn as rebet };
