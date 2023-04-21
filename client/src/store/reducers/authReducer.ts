import { AuthReducerState } from "types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthReducerState = {
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ username: string; balance: number }>,
    ) => {
      state.user = action.payload.username;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, loginFailure } = authSlice.actions;

export default authSlice.reducer;
