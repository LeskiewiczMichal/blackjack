import { PlayerState } from "../../types";
import { createSlice } from "@reduxjs/toolkit"

const initialState: PlayerState = {
    cards: [],
    score: 0,
    balance: 1000,
};

export const playerSlice = createSlice({
    name: "player",
    initialState: initialState,
    reducers: {
        
    }

})

export const { } = playerSlice.actions;

export default playerSlice.reducer;