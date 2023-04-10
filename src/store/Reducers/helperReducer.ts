// Types
import { HelperSliceState } from "types";

// Libraries
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: HelperSliceState = {
  disableSwapHandsAnimation: false,
};

export const helperSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setDisableSwapHandsAnimation: (state, action: PayloadAction<boolean>) => {
      state.disableSwapHandsAnimation = action.payload;
    },
  },
});

export const { setDisableSwapHandsAnimation } = helperSlice.actions;

export default helperSlice.reducer;
