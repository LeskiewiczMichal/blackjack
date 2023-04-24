import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HelperSliceState } from "types.d";

const initialState: HelperSliceState = {
  disableSwapHandsAnimation: false,
  soundsPlaying: true,
  sweepCards: false,
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
    setSweepCards: (state, action: PayloadAction<boolean>) => {
      state.sweepCards = action.payload;
    },
  },
});

export const { setDisableSwapHandsAnimation, setSoundsPlaying, setSweepCards } =
  helperSlice.actions;

export default helperSlice.reducer;
