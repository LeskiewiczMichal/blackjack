import { ShopSliceState } from "types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginSuccess, LoginSuccessProps } from "./authReducer";

const initialState: ShopSliceState = {
  skins: null,
  ownedSkins: null,
  skinPreview: null,
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setSkins: (state, action: PayloadAction<ShopSliceState["skins"]>) => {
      state.skins = action.payload;
    },
    setOwnedSkins: (
      state,
      action: PayloadAction<ShopSliceState["ownedSkins"]>,
    ) => {
      state.ownedSkins = action.payload;
    },
    setSkinPreview: (
      state,
      action: PayloadAction<ShopSliceState["skinPreview"]>,
    ) => {
      state.skinPreview = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginSuccess,
      (state, action: PayloadAction<LoginSuccessProps>) => {
        state.ownedSkins = action.payload.ownedSkins;
      },
    );
  },
});

export const { setSkins, setOwnedSkins, setSkinPreview } = shopSlice.actions;

export default shopSlice.reducer;
