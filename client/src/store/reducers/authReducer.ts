import { AuthReducerState, Skin } from "types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthReducerState = {
  user: null,
  email: null,
  error: null,
};

export type LoginSuccessProps = {
  username: string;
  email: string;
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
      state.email = action.payload.email;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.email = null;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
