import { RootState } from "store/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setInsuranceBet } from "store/reducers/tableReducer";

const betInsurance = createAsyncThunk(
  "table/betInsurance",
  async (_, { getState, dispatch }): Promise<void> => {
    const state = getState() as RootState;
    if (state.player.balance < Math.floor(state.table.currentBet / 2)) {
      return;
    }
    await dispatch(setInsuranceBet(Math.floor(state.table.currentBet / 2)));
  },
);

export { betInsurance };
