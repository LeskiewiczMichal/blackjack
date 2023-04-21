import { AuthReducerState, Skin } from "types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthReducerState = {
  user: null,
  error: null,
};

export type LoginSuccessProps = {
  username: string;
  balance: number;
  ownedSkins: Skin[];
  activeSkins: Skin[];
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginSuccessProps>) => {
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
