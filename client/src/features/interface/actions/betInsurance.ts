import { RootState, AppThunk } from "store/store";
import { setInsuranceBet } from "store/reducers/tableReducer";
import { wrapActionIntoSetActionOn } from "./wrapActionIntoHandler";

// Adds insurance bet worth half of the current bet to the table
const betInsurance = (): AppThunk => async (dispatch, getState) => {
  const state = getState() as RootState;
  const { balance } = state.player;
  const { currentBet } = state.table;

  if (balance < Math.floor(currentBet / 2)) {
    return;
  }
  await dispatch(setInsuranceBet(Math.floor(currentBet / 2)));
};

const betInsuranceWithSetActionOn = (): AppThunk =>
  wrapActionIntoSetActionOn(async (dispatch) => {
    await dispatch(betInsurance());
  });

export { betInsuranceWithSetActionOn as betInsurance };
