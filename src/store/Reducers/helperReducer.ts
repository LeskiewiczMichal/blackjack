import { HelperSliceState } from "types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: HelperSliceState = {
  disableSwapHandsAnimation: false,
  soundsPlaying: true,
};

export const helperSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setDisableSwapHandsAnimation: (state, action: PayloadAction<boolean>) => {
      state.disableSwapHandsAnimation = action.payload;
    },
    setSoundsPlaying: (state, action: PayloadAction<boolean>) => {
      state.soundsPlaying = action.payload;
    },
  },
});

export const { setDisableSwapHandsAnimation, setSoundsPlaying } =
  helperSlice.actions;

export default helperSlice.reducer;
