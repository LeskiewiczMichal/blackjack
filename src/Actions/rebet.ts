import { PlayerState, TableState } from "types.d";
import { AppThunk } from "store/store";
import { incrementBet } from "store/reducers/tableReducer";
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

export { rebet };
