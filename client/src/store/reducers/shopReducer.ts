import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ShopSliceState, Skin } from "types";
import { loginSuccess, LoginSuccessProps, logoutSuccess } from "./authReducer";

const initialState: ShopSliceState = {
  skins: null,
  ownedSkins: null,
  skinPreview: null,
};

type SkinsState = Skin[] | null;

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setSkins: (state, action: PayloadAction<SkinsState>) => {
      state.skins = action.payload;
    },
    setOwnedSkins: (state, action: PayloadAction<SkinsState>) => {
      state.ownedSkins = action.payload;
    },
    setSkinPreview: (state, action: PayloadAction<Skin>) => {
      state.skinPreview = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        loginSuccess,
        (state, action: PayloadAction<LoginSuccessProps>) => {
          state.ownedSkins = action.payload.ownedSkins;
        },
      )
      .addCase(logoutSuccess, (state) => {
        state.ownedSkins = null;
      });
  },
});

export const { setSkins, setOwnedSkins, setSkinPreview } = shopSlice.actions;

export default shopSlice.reducer;
