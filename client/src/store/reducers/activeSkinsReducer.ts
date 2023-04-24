import { ActiveSkinsSlice, Skin } from "types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginSuccess, LoginSuccessProps } from "./authReducer";

const initialState: ActiveSkinsSlice = {
  chips: null,
  cards: null,
  interfaceBackground: null,
};

export type SetActiveSkinsProps = {
  chips: Skin | null;
  cards: Skin | null;
  interfaceBackground: Skin | null;
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setActiveSkins: (state, action: PayloadAction<SetActiveSkinsProps>) => {
      state.cards = action.payload.cards;
      state.chips = action.payload.chips;
      state.interfaceBackground = action.payload.interfaceBackground;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginSuccess,
      (state, action: PayloadAction<LoginSuccessProps>) => {
        const { activeSkins } = action.payload;

        activeSkins.forEach((skin: Skin) => {
          if (skin.category === "Chips") {
            state.chips = skin;
          } else if (skin.category === "Cards") {
            state.cards = skin;
          } else if (skin.category === "InterfaceBackground") {
            state.interfaceBackground = skin;
          }
        });
      },
    );
  },
});

export const { setActiveSkins } = shopSlice.actions;

export default shopSlice.reducer;