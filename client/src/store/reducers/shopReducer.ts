import { ShopSliceState } from "types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginSuccess, LoginSuccessProps } from "./authReducer";

const initialState: ShopSliceState = {
  skins: null,
  ownedSkins: null,
  activeSkins: null,
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setSkins: (state, action: PayloadAction<ShopSliceState["skins"]>) => {
      state.skins = action.payload;
    },
    setOwnedkins: (
      state,
      action: PayloadAction<ShopSliceState["ownedSkins"]>,
    ) => {
      state.ownedSkins = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginSuccess,
      (state, action: PayloadAction<LoginSuccessProps>) => {
        state.ownedSkins = action.payload.ownedSkins;
        state.activeSkins = action.payload.activeSkins;
      },
    );
  },
});

export const { setSkins, setOwnedkins } = shopSlice.actions;

export default shopSlice.reducer;
