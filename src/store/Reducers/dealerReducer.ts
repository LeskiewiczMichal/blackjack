import { DealerState } from "../../types";
import { createSlice } from "@reduxjs/toolkit"

const initialState: DealerState = {
    cards: [],
    score: 0,
};

export const dealerSlice = createSlice({
    name: "dealer",
    initialState: initialState,
    reducers: {
        
    }

})

export const { } = dealerSlice.actions;

export default dealerSlice.reducer;